import React, {PropsWithChildren, useState} from 'react';
import {GlobalContext} from "./global-context";
import {IGlobalState} from "../shared/interfaces/global-state";
import {initialState} from "./initial-state";

export const GlobalProvider = ({children}: PropsWithChildren) => {
    const [state, setState] = useState<IGlobalState>(initialState);

    return (
        <GlobalContext.Provider value={{state, setState}}>
            {children}
        </GlobalContext.Provider>
    );
};

