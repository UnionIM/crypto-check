import React, { FC, useState } from 'react';
import cls from './ListHeader.module.scss';
import TriangleArrow from '../../UI/TriangleArrow/TriangleArrow';

interface ListHeaderProps {
    listHeaders: { title: string; sort: string; width: number }[];
    setSort: any;
    sort: { column: string; isDesc: boolean };
}

const ListHeader: FC<ListHeaderProps> = ({ listHeaders, setSort, sort }) => {
    const [click, setClick] = useState<number>(1);

    const sortButtonHandler = (
        e: React.MouseEvent,
        item: { title: string; sort: string }
    ) => {
        if (click === 1) {
            setClick(2);
            setSort({ column: item.sort, isDesc: true });
        }
        if (click === 2) {
            setClick(1);
            setSort({ column: item.sort, isDesc: false });
        }
    };

    console.log(click);

    return (
        <div className={cls.list_headers}>
            {listHeaders.map((item) => (
                <div
                    className={cls.list_headers__item}
                    style={{ width: `${item.width}px` }}
                >
                    <button
                        key={item.sort}
                        className={[cls.list_headers__button].join(' ')}
                        onClick={(e) => sortButtonHandler(e, item)}
                    >
                        {item.title}
                    </button>
                    <div
                        style={
                            item.sort === sort.column
                                ? { opacity: '1' }
                                : { opacity: '0' }
                        }
                        className={cls.list_headers__triangle}
                        key={`${item.sort}_${item.title}`}
                    >
                        <TriangleArrow isUp={sort.isDesc} color={'black'} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListHeader;
