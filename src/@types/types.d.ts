type Raster = {
    line: number,
    chip: number
}

type Device = {
    gpio: Record<number, Raster>
}