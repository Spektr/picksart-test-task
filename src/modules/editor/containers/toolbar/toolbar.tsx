import {useCallback, useContext} from "react";
import {GlobalContext} from "../../../../store/global-context";
import './toolbar.css';
import {ColorPickerIcon} from "../../../../shared/icons/color-picker-icon";
import {DownloadIcon} from "../../../../shared/icons/download-icon";
import {uploadFile} from "../../../../shared/utils/upload-file";

export const Toolbar = () => {
    const {state: {pickedColor, isColorPickerEnabled, editor}, setState} = useContext(GlobalContext);

    // all content of these handlers should be in store (f.e. redux)
    const togglerHandler = useCallback(() => {
        setState((state) => ({
            ...state,
            isColorPickerEnabled: !state.isColorPickerEnabled,
        }))
    }, [setState]);

    const uploadImageHandler = useCallback(async () => {
        const image = await uploadFile().catch(() => null);
        if(!editor || !image){
            return;
        }
        editor.loadImage(image);
    }, [editor]);

    return (
        <div className="toolbar">
            <div
                role="button"
                className="toolbar__button"
                onClick={uploadImageHandler}
            >
                <DownloadIcon/>
            </div>

            <div
                role="button"
                className={[
                    "toolbar__button",
                    isColorPickerEnabled ? "toolbar__button_enabled" : "",
                ].join(' ')}
                onClick={togglerHandler}
            >
                <ColorPickerIcon/>
            </div>

            <div className="toolbar__color">
                {pickedColor}
            </div>
        </div>
    )
}
