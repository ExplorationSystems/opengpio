"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bias = exports.Edge = void 0;
var Edge;
(function (Edge) {
    Edge[Edge["Rising"] = 1] = "Rising";
    Edge[Edge["Falling"] = -1] = "Falling";
    Edge[Edge["Both"] = 0] = "Both";
})(Edge || (exports.Edge = Edge = {}));
var Bias;
(function (Bias) {
    Bias[Bias["AsIs"] = 1] = "AsIs";
    Bias[Bias["Unknown"] = 2] = "Unknown";
    Bias[Bias["Disabled"] = 3] = "Disabled";
    Bias[Bias["PullUp"] = 4] = "PullUp";
    Bias[Bias["PullDown"] = 5] = "PullDown";
})(Bias || (exports.Bias = Bias = {}));
