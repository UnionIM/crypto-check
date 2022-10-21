import CryptoService from '../service/crypto.service';

export default class CryptoController {
    static async getCoinById(id: string) {
        try {
            return await CryptoService.getCryptoById(id);
        } catch (e) {
            throw e;
        }
    }
}
