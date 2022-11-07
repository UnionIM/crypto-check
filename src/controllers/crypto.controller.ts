import CryptoService from '../service/crypto.service';
import { ICoinSingle, IExtendedCoin, ITickers } from '../models/crypto';
import { pricePrettier } from '../components/Utils/Utils';

export default class CryptoController {
    static async getCoinById(id: string) {
        try {
            return await CryptoService.getCryptoById(id);
        } catch (e) {
            throw e;
        }
    }

    static async getAllCrypto(page: string) {
        try {
            return await CryptoService.getAllCrypto(page);
        } catch (e) {
            throw e;
        }
    }

    static async searchForCrypto(searchValue: string) {
        try {
            return await CryptoService.searchForCrypto(searchValue);
        } catch (e) {
            throw e;
        }
    }

    static async getMarketInfo(
        vsCurrency: string,
        priceChangePercentage: string
    ) {
        try {
            return await CryptoService.getMarketInfo(
                vsCurrency,
                priceChangePercentage
            );
        } catch (e) {
            throw e;
        }
    }

    static coinNormalizer(data: ICoinSingle) {
        try {
            return [
                {
                    name: 'Market cap',
                    value: data.market_data.market_cap.usd
                        ? pricePrettier(data.market_data.market_cap.usd) +
                          ' USD'
                        : null,
                },
                {
                    name: 'FDV',
                    value:
                        data.market_data.current_price &&
                        data.market_data.max_supply
                            ? pricePrettier(
                                  parseFloat(data.market_data.total_supply) *
                                      data.market_data.current_price.usd
                              )
                            : null,
                },
                {
                    name: 'Market cap / FDV',
                    value:
                        data.market_data.circulating_supply &&
                        data.market_data.max_supply
                            ? (
                                  data.market_data.circulating_supply /
                                  data.market_data.max_supply
                              ).toFixed(3)
                            : null,
                },
                {
                    name: 'Market cap change 24h',
                    value:
                        data.market_data.market_cap_change_24h &&
                        data.market_data.market_cap_change_percentage_24h
                            ? pricePrettier(
                                  data.market_data.market_cap_change_24h
                              ) +
                              ' / ' +
                              data.market_data
                                  .market_cap_change_percentage_24h +
                              '%'
                            : null,
                },
                {
                    name: 'Circulating supply',
                    value: data.market_data.circulating_supply
                        ? pricePrettier(data.market_data.circulating_supply)
                        : null,
                },
                {
                    name: 'Max supply',
                    value: data.market_data.max_supply
                        ? pricePrettier(data.market_data.max_supply)
                        : null,
                },
            ];
        } catch (e) {
            throw e;
        }
    }

    static extendedCoinNormalizer(data: IExtendedCoin) {
        return {
            id: data.id,
            name: data.name,
            symbol: data.symbol,
            image: data.image.thumb,
            price: data.market_data.current_price.usd,
            price24h: data.market_data.price_change_percentage_24h,
            price7d: data.market_data.price_change_percentage_7d,
            price30d: data.market_data.price_change_percentage_30d,
            market_cap: data.market_data.market_cap.usd,
            market_cap_24h: data.market_data.market_cap_change_percentage_24h,
            fdv:
                parseFloat(data.market_data.total_supply) &&
                data.market_data.current_price.usd
                    ? parseFloat(data.market_data.total_supply) *
                      data.market_data.current_price.usd
                    : -1,
            mc_fdv:
                data.market_data.market_cap.usd &&
                parseFloat(data.market_data.total_supply)
                    ? data.market_data.market_cap.usd /
                      (parseFloat(data.market_data.total_supply) *
                          data.market_data.current_price.usd)
                    : -1,
        };
    }

    static marketNormalizer(data: ITickers) {
        return {
            coin_id: data.coin_id,
            converted_last: data.converted_last.usd,
            last_fetch_at: data.last_fetch_at,
            trust_score: data.trust_score,
            target: data.target,
            trade_url: data.trade_url,
            market: data.market.name,
        };
    }
}
