{
  "targets": [
    {
        "target_name": "opengpio",
        "sources": [ "cpp/opengpio.cpp" ],
        "include_dirs": [
            "<!@(node -p \"require('node-addon-api').include\")",
            "<(module_root_dir)/cpp/bindings/include"
        ],  
        "libraries": [
            "-L<(module_root_dir)/cpp/bindings/arm/ -lgpiodcxx",
        ],
        "ldflags": [
            "-L<(module_root_dir)/cpp/bindings/arm/",        
            "-Wl,-rpath=<(module_root_dir)/cpp/bindings/arm/"  
        ],
        "cflags_cc!": ["-fno-exceptions"],
        "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ],
    }
  ]
}