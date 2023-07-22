import React, {useContext} from 'react';
import './app.css';
import {Toolbar} from "../../../editor/containers/toolbar/toolbar";
import {EditorArea} from "../../../editor/containers/editor-area/editor-area";
import {GlobalContext} from "../../../../store/global-context";

export const App = () => {
    const {state: {isColorPickerEnabled}} = useContext(GlobalContext);

    return (
        <div className="app">
            <header className="app__header">
                <strong>Color Dropper</strong>
            </header>

            <main className="app__body">
                <Toolbar/>
                {isColorPickerEnabled}
                <EditorArea/>
            </main>
        </div>
    );
}
