import React, {useContext, useEffect, useRef, useState} from "react";
import './color-picker-cursor.css';
import {GlobalContext} from "../../../../store/global-context";
import {SelectedColorIcon} from "../../../../shared/icons/selected-color-icon";
import {createPortal} from "react-dom";
import {drawPixelGrid} from "../../shared/utils/draw-pixel-grid";

/**
 *  Calculate proper cursor size (f.e 10x10 grid + 1 to intersection)
 * @param zoom      - zoom level (one pixel representation)
 * @param boundary  - no more than this size
 */
function calculateCursorSize(zoom: number, boundary = 200) {
    const parts = Math.floor(boundary / zoom);
    return zoom * parts + (parts & 1 ? 0 : zoom);
}

export const ColorPickerCursor = (): React.JSX.Element => {
    const {state: {editor, zoom}, setState} = useContext(GlobalContext);
    const [size, setSize] = useState<number>(calculateCursorSize(zoom));
    const [top, setTop] = useState<number>(0);
    const [left, setLeft] = useState<number>(0);
    const [hoveredColor, setHoveredColor] = useState<string>();
    const [enabled, setEnabled] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setSize(calculateCursorSize(zoom));
    }, [zoom, setSize]);

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
            const srcSize = size / zoom;
            const shift = Math.round(srcSize / 2);

            // fill by white background
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, size, size);

            ctx.drawImage(editor.canvas, x - shift, y - shift, srcSize, srcSize, 0, 0, size, size);

            // if zoom level is small then grid doesn't need
            if (zoom > 10) {
                drawPixelGrid(ctx, size, size, zoom);
            }
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

        const enableHandler = () => setEnabled(true);
        const disableHandler = () => setEnabled(false);

        editor.addEventListener('mousemove', updateCursorBackgroundHandler);
        editor.addEventListener('mousemove', trackCursorPositionHandler);
        editor.addEventListener('click', selectColorHandler);
        editor.addEventListener('mouseover', enableHandler);
        editor.addEventListener('mouseout', disableHandler);

        return () => {
            editor.removeEventListener('mousemove', updateCursorBackgroundHandler);
            editor.removeEventListener('mousemove', trackCursorPositionHandler);
            editor.removeEventListener('click', selectColorHandler);
            editor.removeEventListener('mouseover', enableHandler);
            editor.removeEventListener('mouseout', disableHandler);
        };

    }, [editor, canvasRef, zoom, size, setState]);

    return createPortal(
        (<div className="color-picker-cursor" style={{display: enabled ? 'flex' : 'none', width: size, height: size, top, left}}>
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
                <div className="color-picker-cursor__title">{hoveredColor}</div>
            </div>
        </div>),
        document.body
    );
}
