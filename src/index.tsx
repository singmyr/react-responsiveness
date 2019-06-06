import * as React from 'react';
export { default as ResponsivenessProvider } from './provider';
import { Consumer } from './context';

export const withResponsiveness = (C: any): React.ReactNode => {
    return function Responsiveness(props: any): React.ReactNode {
        return <Consumer>{(context: any): React.ReactNode => <C {...props} responsive={context} />}</Consumer>;
    };
};
