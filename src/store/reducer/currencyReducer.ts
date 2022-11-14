import { IUserAction, ICurrencyState } from '../../models/crypto';

const CURRENCY = 'CURRENCY';

const initialState = {
    currency: 'usd',
};

export const CurrencyReducer = (
    state = initialState,
    action: IUserAction
): ICurrencyState => {
    switch (action.type) {
        case CURRENCY:
            return { currency: action.payload || 'usd' };
        default:
            return state;
    }
};
