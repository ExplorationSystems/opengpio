use gpiod::{Chip, Edge, EdgeDetect, Options};
use neon::prelude::*;
use std::{thread, time};

fn get_gpio(mut cx: FunctionContext) -> JsResult<JsBoolean> {
    let chip_number = cx.argument::<JsNumber>(0)?.value(&mut cx) as u32;
    let line_number = cx.argument::<JsNumber>(1)?.value(&mut cx) as u32;

    // Concatinate a number to a string
    let chip = match Chip::new(format!("gpiochip{}", chip_number)) {
        Ok(it) => it,
        Err(err) => return cx.throw_error(err.to_string()),
    }; // open chip

    let opts = Options::input([line_number]); // configure lines offsets

    let inputs = match chip.request_lines(opts) {
        Ok(it) => it,
        Err(err) => return cx.throw_error(err.to_string()),
    };

    // get all three values
    let values = match inputs.get_values([false; 1]) {
        Ok(it) => it,
        Err(err) => return cx.throw_error(err.to_string()),
    };

    Ok(cx.boolean(values[0]))
}

fn set_gpio(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let chip_number = cx.argument::<JsNumber>(0)?.value(&mut cx) as u32;
    let line_number = cx.argument::<JsNumber>(1)?.value(&mut cx) as u32;
    let value = cx.argument::<JsBoolean>(2)?.value(&mut cx);

    println!("chip_number: {}", chip_number);
    println!("line_number: {}", line_number);
    println!("value: {}", value);

    let chip = match Chip::new(format!("gpiochip{}", chip_number)) {
        Ok(it) => it,
        Err(err) => return cx.throw_error(err.to_string()),
    }; // open chip

    let opts = Options::output([line_number]);

    let outputs = match chip.request_lines(opts) {
        Ok(it) => it,
        Err(err) => return cx.throw_error(err.to_string()),
    };

    match outputs.set_values([value]) {
        Ok(it) => it,
        Err(err) => return cx.throw_error(err.to_string()),
    };

    Ok(cx.undefined())
}

fn watch_gpio(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let chip_number = cx.argument::<JsNumber>(0)?.value(&mut cx) as u32;
    let line_number = cx.argument::<JsNumber>(1)?.value(&mut cx) as u32;
    let edge = match cx.argument::<JsNumber>(2)?.value(&mut cx) as i32 {
        0 => EdgeDetect::Rising,
        1 => EdgeDetect::Falling,
        2 => EdgeDetect::Both,
        _ => return cx.throw_error("Invalid edge"),
    };
    let callback = cx.argument::<JsFunction>(3)?;

    let chip = match Chip::new(format!("gpiochip{}", chip_number)) {
        Ok(it) => it,
        Err(err) => return cx.throw_error(err.to_string()),
    }; // open chip

    let opts = Options::input([line_number]) // configure lines offsets
        .edge(edge) // configure edges to detect
        .consumer("my-inputs"); // optionally set consumer string

    let mut inputs = match chip.request_lines(opts) {
        Ok(it) => it,
        Err(err) => return cx.throw_error(err.to_string()),
    };

    loop {
        let event = match inputs.read_event() {
            Ok(it) => it,
            Err(err) => return cx.throw_error(err.to_string()),
        };

        let value = cx
            .boolean(match event.edge {
                Edge::Rising => true,
                Edge::Falling => false,
            })
            .as_value(&mut cx);

        callback.call(&mut cx, callback, [value])?;
        // callback.call_with(&mut cx)
        // .arg([])
        // .apply(&mut cx)?;

        // println!("event: {:?}", event);
    }

    // Ok(cx.undefined())
}

fn pwm_gpio(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let chip_number = cx.argument::<JsNumber>(0)?.value(&mut cx) as u32;
    let line_number = cx.argument::<JsNumber>(1)?.value(&mut cx) as u32;
    let duty_cycle = cx.argument::<JsNumber>(2)?.value(&mut cx) as f32;
    let hertz = cx.argument::<JsNumber>(3)?.value(&mut cx) as u32;

    // println!("chip_number: {}", chip_number);
    // println!("line_number: {}", line_number);
    // println!("duty_cycle: {}", duty_cycle);
    // println!("hertz: {}", hertz);

    let chip = match Chip::new(format!("gpiochip{}", chip_number)) {
        Ok(it) => it,
        Err(err) => return cx.throw_error(err.to_string()),
    }; // open chip

    let opts = Options::output([line_number]);

    let outputs = match chip.request_lines(opts) {
        Ok(it) => it,
        Err(err) => return cx.throw_error(err.to_string()),
    };

    // Create a pwm loop that sets the pin high for X% of the time and low for the rest based on a duty cycle represented by a float between 0 and 1 and a frequency in Hz
    let base_period = 1000000; // 1 second as microseconds
    let period = base_period / hertz; 

    // println!("period: {}", period);

    if duty_cycle <= 0.0 {
        // println!("duty_cycle <= 0.0");
        match outputs.set_values([false]) {
            Ok(it) => it,
            Err(err) => return cx.throw_error(err.to_string()),
        };
        return Ok(cx.undefined());
    } else if duty_cycle >= 1.0 {
        // println!("duty_cycle >= 1.0");
        match outputs.set_values([true]) {
            Ok(it) => it,
            Err(err) => return cx.throw_error(err.to_string()),
        };
        return Ok(cx.undefined());
    }

    let time_high = (period as f32 * duty_cycle) as u64;
    let time_low = (period as u64 - time_high) as u64;

    // println!("time_high: {}", time_high);
    // println!("time_low: {}", time_low);

    loop {
        // Set High For X% of duty cycle
        match outputs.set_values([true]) {
            Ok(it) => it,
            Err(err) => return cx.throw_error(err.to_string()),
        };
        thread::sleep(time::Duration::from_micros(time_high));
        match outputs.set_values([false]) {
            Ok(it) => it,
            Err(err) => return cx.throw_error(err.to_string()),
        };
        thread::sleep(time::Duration::from_micros(time_low));
    }
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("get", get_gpio)?;
    cx.export_function("set", set_gpio)?;
    cx.export_function("pwm", pwm_gpio)?;
    cx.export_function("watch", watch_gpio)?;
    Ok(())
}
