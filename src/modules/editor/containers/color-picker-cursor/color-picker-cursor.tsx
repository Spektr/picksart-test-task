import React, {useContext, useEffect, useRef, useState} from "react";
import './color-picker-cursor.css';
import {GlobalContext} from "../../../../store/global-context";
import {SelectedColorIcon} from "../../../../shared/icons/selected-color-icon";
import {createPortal} from "react-dom";
import {drawPixelGrid} from "../../shared/utils/draw-pixel-grid";

export const ColorPickerCursor = (): React.JSX.Element => {
    const {state: {editor, zoom}, setState} = useContext(GlobalContext);
    const [size, setSize] = useState<number>(zoom * (zoom <= 10 ? 20 : 10) + zoom); // 10x10 grid + 1 to intersection
    const [top, setTop] = useState<number>(0);
    const [left, setLeft] = useState<number>(0);
    const [hoveredColor, setHoveredColor] = useState<string>();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!editor || !canvasRef.current) {
            return;
        }

        // TODO: maybe it will be move it to cursor wrapper (to remove logic from business layer)
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) {
            return;
        }
        ctx.imageSmoothingEnabled = false;

        const updateCursorBackgroundHandler = (e: MouseEvent) => {
            const {x, y} = editor.getAdjustedCoords(e.offsetX, e.offsetY);
            ctx.drawImage(editor.canvas, x, y, size / zoom, size / zoom, 0, 0, size, size);
            drawPixelGrid(ctx, size, size, zoom);
            setHoveredColor(editor.getColor(x, y));
        };
        const trackCursorPositionHandler = (e: MouseEvent) => {
            setLeft(e.pageX - size / 2);
            setTop(e.pageY - size / 2);
        };
        const selectColorHandler = (e: MouseEvent) => {
            const {x, y} = editor.getAdjustedCoords(e.offsetX, e.offsetY);
            setState((state) => ({...state, pickedColor: editor.getColor(x, y)}));
        }

        editor.addEventListener('mousemove', updateCursorBackgroundHandler);
        editor.addEventListener('mousemove', trackCursorPositionHandler);
        editor.addEventListener('click', selectColorHandler);

        return () => {
            editor.removeEventListener('mousemove', updateCursorBackgroundHandler);
            editor.removeEventListener('mousemove', trackCursorPositionHandler);
            editor.removeEventListener('click', selectColorHandler);
        };

    }, [editor, canvasRef]);

    return createPortal(
        (<div className="color-picker-cursor" style={{width: size, height: size, top, left}}>
            <div className="editor-cursor__wrapper">
                <canvas
                    ref={canvasRef}
                    width={size}
                    height={size}
                    className="color-picker-cursor__canvas"
                >
                    <div>Canvas wasn't supported by this browser, you are looser ^_^</div>
                </canvas>
                <div className="editor-cursor__circle">
                    <SelectedColorIcon size={size} color={hoveredColor || '#ffffff'}/>
                </div>
                <div
                    style={{marginTop: zoom * 4}}
                    className="color-picker-cursor__title"
                >{hoveredColor}</div>
            </div>
        </div>),
        document.body
    );
}
