{
  "targets": [
    {
      "target_name": "opengpio",
      "sources": [ "cpp/opengpio.cpp" ],
       "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "cflags!": ["-fexceptions"],
      "cflags_cc!": ["-fexceptions"],
      "xcode_settings": {
        "OTHER_CFLAGS": ["-fexceptions"],
        "OTHER_CPLUSPLUSFLAGS": ["-fexceptions"]
      }
    }
  ]
}