import * as React from 'react';

const { Consumer, Provider } = React.createContext({
    breakpoints: [] as number[],
});

export { Consumer, Provider };
