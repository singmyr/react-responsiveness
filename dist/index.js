"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var provider_1 = require("./provider");
exports.ResponsivenessProvider = provider_1.default;
const context_1 = require("./context");
exports.withResponsiveness = (C) => {
    return function Responsiveness(props) {
        return (React.createElement(context_1.Consumer, null, (context) => React.createElement(C, Object.assign({}, props, { responsive: context }))));
    };
};
//# sourceMappingURL=index.js.map