// Use gpio drivers to toggle a single GPIO
// line on Raspberry Pi

// Use following commands to install prerequisites and build
// sudo apt install gpiod
// sudo apt install libgpiod-dev
// g++ -Wall -o gpio gpip.cpp -lgpiodcxx

#include <iostream>
#include <gpiod.hpp>
#include <unistd.h>
 
int main(void)
{ 
   ::gpiod::chip chip("gpiochip0");
   
   auto line = chip.get_line(27);  // GPIO17
   line.request({"example", gpiod::line_request::DIRECTION_OUTPUT, 0},1);  
   
   sleep(0.1);
   
   line.set_value(0);
   sleep(1);
   line.set_value(1);
   sleep(1);
   line.set_value(0);
   sleep(1);
   line.set_value(1);
   sleep(1);
   line.set_value(0);
   sleep(1);
   line.set_value(1);
   sleep(1);
   line.release();
}