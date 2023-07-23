/**
 * Draw the pixel grid
 *
 * @param ctx   - canvas context
 * @param w - block width
 * @param h - block height
 * @param pixelSize - size of each pixel
 * @param gridColor - color of the grid lines
 * @param highlightColor - color of the highlight cell
 */
export function drawPixelGrid(
    ctx: CanvasRenderingContext2D,
    w:number,
    h:number,
    pixelSize: number = 20,
    gridColor: string | CanvasGradient | CanvasPattern = '#606060',
    highlightColor: string | CanvasGradient | CanvasPattern = '#ffffff',
) {
    ctx.strokeStyle = gridColor;

    // Draw vertical lines
    for (let x = 0; x <= w; x += pixelSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= h; y += pixelSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }

    // Draw highlighted cell
    const cols = w/pixelSize;
    const rows = h/pixelSize;
    if(!!(cols&1) && !!(rows&1)){   // check cols and rows must be odd to draw centered cell
        ctx.strokeStyle = highlightColor;
        const left = (w - pixelSize)/2;
        const top = (h - pixelSize)/2;
        ctx.strokeRect(left, top, pixelSize, pixelSize);
        ctx.stroke();
    }
}
