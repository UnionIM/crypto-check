import React, { FC, useState } from 'react';
import cls from './ListHeader.module.scss';
import TriangleArrow from '../../UI/TriangleArrow/TriangleArrow';

interface ListHeaderProps {
    listHeaders: { title: string; sort: string; width: number }[];
    setSort: any;
}

const ListHeader: FC<ListHeaderProps> = ({ listHeaders, setSort }) => {
    const [arrow, setArrow] = useState<boolean>();

    const sortButtonHandler = (
        e: React.MouseEvent,
        item: { title: string; sort: string }
    ) => {
        if (e.detail === 1) {
            setSort({ column: item.sort, isDesc: true });
        } else {
            setSort({ column: item.sort, isDesc: false });
        }
    };

    return (
        <div className={cls.list_headers}>
            {listHeaders.map((item) => (
                <button
                    key={item.sort}
                    className={[cls.list_headers__item].join(' ')}
                    onClick={(e) => sortButtonHandler(e, item)}
                    style={{ width: `${item.width}px` }}
                >
                    {item.title}
                    {/*<TriangleArrow isUp={false} color={'black'} />*/}
                </button>
            ))}
        </div>
    );
};

export default ListHeader;
