import * as React from 'react';
import { Component } from 'react';
import { Provider } from './context';

interface ResponsivenessProps {
    breakpoints: string[];
}
export default class ResponsivenessProvider extends Component<ResponsivenessProps> {
    public state: {
        breakpoints: number[];
    };

    private breakpointsMap: any = {};

    public constructor(props: ResponsivenessProps) {
        super(props);

        let matched = [] as number[];
        if (typeof window !== 'undefined') {
            props.breakpoints.forEach(
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
