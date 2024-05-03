export function customColorWithAlpha(color: string, alpha: number = 1) {
    return `rgb(from var(${color}) r g b / ${alpha})`;
}
