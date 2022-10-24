export interface ICoinDescription {
    en: string;
}

export interface ICoin {
    id: string;
    image: string;
    name: string;
    price_change_percentage_24h: number;
    description: ICoinDescription;
}
