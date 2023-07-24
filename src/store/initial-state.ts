import {IGlobalState} from "../shared/interfaces/global-state";

export const initialState: IGlobalState = {
    zoom: 10,
    isColorPickerEnabled: false,
    pickedColor: null,
    editor: null,
};
