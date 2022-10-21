export interface ICoinDescription {
    en: string;
}

export interface ICoin {
    id: string;
    name: string;
    description: ICoinDescription;
}
