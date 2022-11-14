import Home from '../pages/Home';
import CoinPage from '../pages/CoinPage';
import CoinList from '../pages/CoinList';

export const routes = [
    { path: '', component: Home },
    { path: '/coins/:coinId/:path', component: CoinPage },
    { path: '/coin-list/:page', component: CoinList },
];
