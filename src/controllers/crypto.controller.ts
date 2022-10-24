import CryptoService from '../service/crypto.service';

export default class CryptoController {
    static async getCoinById(id: string) {
        try {
            return await CryptoService.getCryptoById(id);
        } catch (e) {
            throw e;
        }
    }

    static async getAllCrypto() {
        try {
            return await CryptoService.getAllCrypto();
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
}
