import React, {useContext} from 'react';
import './app.css';
import {GlobalContext} from "../../../../store/global-context";

export const App = () => {
    const {state: {isColorPickerEnabled}} = useContext(GlobalContext);

    return (
        <div className="app">
            <header className="app__header">
                <strong>Color Dropper</strong>
            </header>

            <main className="app__body">
                {isColorPickerEnabled}
            </main>
        </div>
    );
}
