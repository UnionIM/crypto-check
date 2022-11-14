import React from 'react';
import cls from './List.module.scss';

interface ListProps<T> {
    items: T[];
    renderItem: (item: T, index?: number) => React.ReactNode;
    equalWidth?: boolean;
}

export default function List<T>(props: ListProps<T>) {
    return (
        <div className={props.equalWidth ? cls.list__flex : ''}>
            {props.items.map(props.renderItem)}
        </div>
    );
}
