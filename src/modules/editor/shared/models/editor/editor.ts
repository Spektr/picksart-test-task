import {rgbToHex} from "../../../../../shared/utils/rgb-to-hex";
import {IEditor} from "../../interfaces/editor";

export class Editor implements IEditor {
    private context: CanvasRenderingContext2D;
    private width = 800;
    private height = 400;

    constructor(readonly canvas: HTMLCanvasElement, type = '2d') {
        const context = canvas.getContext('2d');

        if (!context) {
            throw new Error(`Canvas context ${type} is not supported`);
        }
        this.context = context;
    }

    loadImage(image: HTMLImageElement): void {
        this.width = image.width;
        this.height = image.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context.drawImage(image, 0, 0, this.width, this.height);
    }

    getAdjustedCoords(x: number, y: number): { x: number; y: number } {
        const rootSizes = this.canvas.getBoundingClientRect();
        x *= (this.width / rootSizes.width);
        y *= (this.height / rootSizes.height);
        return {x:Math.round(x), y:Math.round(y)};
    }

    getColor(x: number, y: number): string {
        const data = this.context.getImageData(x, y, 1, 1).data;
        return rgbToHex(data[0], data[1], data[2]);
    }

    getSprite(x: number, y: number, w: number, h: number, centred = false): ImageData {
        if (centred) {
            x -= w / 2;
            y -= h / 2;
        }

        return this.context.getImageData(x, y, w, h);
    }

    get addEventListener() {
        return this.canvas.addEventListener.bind(this.canvas);
    }

    get removeEventListener() {
        return this.canvas.removeEventListener.bind(this.canvas);
    }
}
