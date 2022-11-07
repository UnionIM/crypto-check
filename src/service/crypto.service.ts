import api from '../API/api';
import { ICoin, ICoinSingle, IExtendedCoin, ISearch } from '../models/crypto';

export default class CryptoService {
    static async getCryptoById(id: string) {
        return (await api.get<ICoinSingle>(`/coins/${id}`)).data;
    }

    static async getAllCrypto(page: string = '1') {
        return await api.get<IExtendedCoin[]>(`/coins?page=${page}`);
    }

    static async searchForCrypto(searchValue: string) {
        return (await api.get<ISearch>(`/search?query=${searchValue}`)).data;
    }

    static async getMarketInfo(
        vsCurrency: string,
        priceChangePercentage: string
    ) {
        return (
            await api.get<ICoin[]>(
                `/coins/markets?vs_currency=${vsCurrency}&price_change_percentage=${priceChangePercentage}&per_page=200`
            )
        ).data;
    }
}
