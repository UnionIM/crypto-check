import { createStore } from 'redux';
import { CurrencyReducer } from './reducer/currencyReducer';

export const store = createStore(CurrencyReducer);
