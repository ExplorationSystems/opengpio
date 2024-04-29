{
  "targets": [
    {
        "target_name": "opengpio",
        "sources": [ "cpp/opengpio.cpp" ],
        "include_dirs": [
            "<!@(node -p \"require('node-addon-api').include\")",
            "<(module_root_dir)/libgpiod/bindings/cxx"
        ],  
        "libraries": [
            "-L<(module_root_dir)/libgpiod/bindings/cxx/.libs/ -lgpiodcxx",
        ],
        "cflags_cc!": ["-fno-exceptions"],
        "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ],
    }
  ]
}