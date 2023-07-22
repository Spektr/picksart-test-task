export function rgbToHex(r:number, g:number, b:number) {
    // Convert each component to its two-digit hexadecimal representation
    const hexR = Number(r).toString(16).padStart(2, '0');
    const hexG = Number(g).toString(16).padStart(2, '0');
    const hexB = Number(b).toString(16).padStart(2, '0');

    // Combine the components and return the hexadecimal color value
    return `#${hexR}${hexG}${hexB}`;
}
