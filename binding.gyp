{
  "targets": [
    {
        "target_name": "opengpio",
        "sources": [ "cpp/opengpio.cpp" ],
        "include_dirs": [
            "<!@(node -p \"require('node-addon-api').include\")",
            "./cpp/libgpiod/bindings/cxx"
        ],  
        "libraries": [
            "-L./cpp/libgpiod/bindings/cxx"

        ],
        "cflags_cc!": ["-fno-exceptions"],
        "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ],
    }
  ]
}