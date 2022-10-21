import api from '../API/api';
import { ICoin } from '../models/crypto';

export default class CryptoService {
    static async getCryptoById(id: string) {
        console.log(api);
        return (await api.get<ICoin>(`/coins/${id}`)).data;
    }
}
