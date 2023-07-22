import {createContext, Dispatch, SetStateAction} from 'react';
import {IGlobalState} from "../shared/interfaces/global-state";
import {initialState} from "./initial-state";

export const GlobalContext = createContext<{
    state: IGlobalState;
    setState: Dispatch<SetStateAction<IGlobalState>>;
}>({    // default value will be overwritten in provider
    state: initialState,
    setState: () => void (0)
});

