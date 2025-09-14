export interface ShowcaseProps<Y> {
    data: Y[];
    searchKeys: (keyof Y)[];
    displayKey: keyof Y;
}