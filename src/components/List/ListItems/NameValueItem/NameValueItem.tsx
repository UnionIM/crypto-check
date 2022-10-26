import React, { FC } from 'react';
import cls from './NameValueItem.module.scss';
import { INameValue } from '../../../../models/crypto';

interface NameValueItem {
    item: INameValue;
}

const NameValueItem: FC<NameValueItem> = ({ item }) => {
    if (!item.value) {
        return null;
    }

    return (
        <div className={cls.item}>
            <div>{item.name}</div>
            <div>{item.value}</div>
        </div>
    );
};

export default NameValueItem;
