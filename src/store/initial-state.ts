import {IGlobalState} from "../shared/interfaces/global-state";

export const initialState: IGlobalState = {
    zoom: 15,
    isColorPickerEnabled: false,
    pickedColor: null,
    editor: null,
};
