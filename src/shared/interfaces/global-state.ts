import {IEditor} from "../../modules/editor/shared/interfaces/editor";

export interface IGlobalState {
    zoom: number;                   // how many pixels will be to draw one pixel :)
    isColorPickerEnabled: boolean;  // is color picker enabled or not
    pickedColor: string | null;     // what color was picked
    editor: IEditor | null;         // simple canvas wrapper
}
