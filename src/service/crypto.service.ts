import api from '../API/api';
import {
  IExtendedCoin,
  IChartData,
  ICoin,
  ICoinSingle,
  ISearch,
} from '../models/crypto';

export default class CryptoService {
  static async getCryptoById(id: string) {
    return (await api.get<ICoinSingle>(`/coins/${id}`)).data;
  }

  static async getAllCrypto(
    page: string = '1',
    selectedCurrency: string = 'usd'
  ) {
    return await api.get<IExtendedCoin[]>(
      `/coins/markets?vs_currency=${selectedCurrency}&page=${page}&per_page=50&price_change_percentage=7d%2C30d`
    );
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
        `/coins/markets?vs_currency=${vsCurrency}&price_change_percentage=${priceChangePercentage}&per_page=250`
      )
    ).data;
  }

  static async getChartData(
    id: string,
    vsCurrency: string,
    from: number,
    to: number
  ) {
    return (
      await api.get<IChartData>(
        `/coins/${id}/market_chart/range?vs_currency=${vsCurrency}&from=${from}&to=${to}`
      )
    ).data;
  }
}
