export interface IEditor {
    canvas: CanvasImageSource;
    loadImage(image: HTMLImageElement): void;
    getAdjustedCoords(x: number, y: number): {x: number; y: number};
    getColor(x: number, y: number): string;
    getSprite(x: number, y: number, w: number, h: number, centred?: boolean): ImageData;
    addEventListener: HTMLCanvasElement['addEventListener'];
    removeEventListener: HTMLCanvasElement['removeEventListener'];
}
