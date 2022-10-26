import Home from '../pages/Home';
import CoinPage from '../pages/CoinPage';

export const routes = [
    { path: '', component: Home },
    { path: '/coins/:coinId/:path', component: CoinPage },
];
