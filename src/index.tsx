import * as React from 'react';
export { default as ResponsivenessProvider } from './provider';
import { Consumer } from './context';

interface ContextInterface {
    breakpoints: number[];
}
interface RendererProps {
    responsive: ContextInterface;
}
export const withResponsiveness = (C: React.ComponentClass<RendererProps>): React.ReactNode => {
    return function Responsiveness(props: {}): React.ReactNode {
        return (
            <Consumer>{(context: ContextInterface): React.ReactNode => <C {...props} responsive={context} />}</Consumer>
        );
    };
};
