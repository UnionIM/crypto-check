import Home from '../pages/Home';
import CoinPage from '../pages/CoinPage';
import CoinList from '../pages/CoinList';
import SearchedCoins from '../pages/SearchedCoins';

export const routes = [
    { path: '', component: Home },
    { path: '/coins/:coinId/:path', component: CoinPage },
    { path: '/coin-list', component: CoinList },
    { path: '/coin-list/:searchValue', component: SearchedCoins },
];
