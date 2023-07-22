import React, {useContext, useEffect, useRef} from "react";
import './editor-area.css';
import {GlobalContext} from "../../../../store/global-context";
import {Editor} from "../../shared/models/editor/editor";

export const EditorArea = (): React.JSX.Element => {
    const {setState} = useContext(GlobalContext);
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvas.current) {
            throw new Error('Cant find canvas element');
        }

        const editor = new Editor(canvas.current);
        setState((state) => ({...state, editor}));
    }, [canvas, setState]);

    return (
        <div className="editor-area">
            <canvas ref={canvas} className="editor-area__canvas">
                <div>Canvas wasn't supported by this browser, you are looser ^_^</div>
            </canvas>
        </div>
    );
}
