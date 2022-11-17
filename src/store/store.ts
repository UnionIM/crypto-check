import { CurrencyReducer } from './reducer/currencyReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({ reducer: { currency: CurrencyReducer } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
