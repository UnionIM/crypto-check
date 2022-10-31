export interface ICoinDescription {
    en: string;
}

export interface INameValue {
    name: string;
    value: string | number | null;
}

export interface ICoin {
    id: string;
    image: string;
    name: string;
    price_change_percentage_24h: number;
    description: ICoinDescription;
}

export interface ICoinImage {
    large: string;
    small: string;
    thumb: string;
}

export interface IPrice {
    [key: string]: number;
}

export interface ICoinMarketData {
    current_price: IPrice;
    market_cap: IPrice;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    max_supply: number;
}

export interface ITickers {
    coin_id: string;
    converted_last: IPrice;
    last_fetch_at: string;
    trust_score: string;
    target: string;
    trade_url: string;
    market: { name: string };
}

export interface ICoinSingle {
    id: string;
    name: string;
    symbol: string;
    asset_platform_id: string;
    community_score: number;
    description: ICoinDescription;
    image: ICoinImage;
    market_data: ICoinMarketData;
    links: object;
    liquidity_score: number;
    market_cap_rank: number;
    public_interest_score: number;
    tickers: ITickers[];
}

export interface ISearch {
    categories: [];
    coins: [ISearchedCoin];
    exchanges: [];
}

export interface ISearchedCoin {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
}
