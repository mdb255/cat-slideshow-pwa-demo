export function stylesWithLabels(styles: any, cmpName: string) {
    Object.keys(styles).forEach((key) => {
        styles[key].label = `${cmpName}--${key}`;
    });
    return styles;
}
