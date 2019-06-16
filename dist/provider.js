"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const context_1 = require("./context");
class ResponsivenessProvider extends react_1.Component {
    constructor(props) {
        super(props);
        this.breakpointsMap = {};
        this.mediaQueryChanged = (mq) => {
            const mqIndex = this.breakpointsMap[mq.media];
            if (mqIndex !== undefined) {
                const index = this.state.breakpoints.indexOf(mqIndex);
                if (mq.matches) {
                    if (index === -1) {
                        this.setState({
                            breakpoints: [...this.state.breakpoints, mqIndex],
                        });
                    }
                }
                else {
                    if (index !== -1) {
                        let newBreakpoints = [...this.state.breakpoints];
                        newBreakpoints.splice(index, 1);
                        this.setState({
                            breakpoints: newBreakpoints,
                        });
                    }
                }
            }
        };
        const { breakpoints, breakpoint } = props;
        let matched = [];
        if (breakpoint) {
            if (breakpoint < breakpoints.length) {
                matched.push(breakpoint);
            }
            else {
            }
        }
        if (typeof window !== 'undefined') {
            breakpoints.forEach((bp, i) => {
                const bpString = `(max-width: ${bp})`;
                let mq = window.matchMedia(bpString);
                if (mq.matches) {
                    matched.push(i);
                }
                mq.addListener(this.mediaQueryChanged);
                this.breakpointsMap[bpString] = i;
            });
        }
        this.state = {
            breakpoints: matched,
        };
    }
    render() {
        return (React.createElement(context_1.Provider, { value: {
                breakpoints: this.state.breakpoints,
            } }, this.props.children));
    }
}
exports.default = ResponsivenessProvider;
//# sourceMappingURL=provider.js.map