import * as React from 'react';
import { Component } from 'react';
import { Provider } from './context';

interface StringMap {
    [s: string]: number;
}
interface ResponsivenessProps {
    breakpoints: string[];
    breakpoint?: number;
}
export default class ResponsivenessProvider extends Component<ResponsivenessProps> {
    public state: {
        breakpoints: number[];
    };

    private breakpointsMap: StringMap = {};

    public constructor(props: ResponsivenessProps) {
        super(props);

        const { breakpoints, breakpoint } = props;
        let matched = [] as number[];

        if (breakpoint) {
            if (breakpoint < breakpoints.length) {
                matched.push(breakpoint);
            } else {
                // @todo: Throw error because the breakpoint is not available.
            }
        }
        if (typeof window !== 'undefined') {
            breakpoints.forEach(
                (bp, i): void => {
                    const bpString = `(max-width: ${bp})`;
                    let mq = window.matchMedia(bpString);
                    if (mq.matches) {
                        matched.push(i);
                    }
                    mq.addListener(this.mediaQueryChanged);

                    this.breakpointsMap[bpString] = i;
                },
            );
        }

        this.state = {
            breakpoints: matched,
        };
    }

    private mediaQueryChanged = (mq: MediaQueryListEvent): void => {
        const mqIndex = this.breakpointsMap[mq.media];
        if (mqIndex !== undefined) {
            const index = this.state.breakpoints.indexOf(mqIndex);
            if (mq.matches) {
                if (index === -1) {
                    this.setState({
                        breakpoints: [...this.state.breakpoints, mqIndex],
                    });
                }
            } else {
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

    public render(): React.ReactNode {
        return (
            <Provider
                value={{
                    breakpoints: this.state.breakpoints,
                }}
            >
                {this.props.children}
            </Provider>
        );
    }
}
