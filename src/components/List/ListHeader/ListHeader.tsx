import React, { FC, useEffect, useState } from 'react';
import cls from './ListHeader.module.scss';
import TriangleArrow from '../../UI/TriangleArrow/TriangleArrow';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

interface ListHeaderProps {
  listHeaders: {
    title: string;
    sort: string;
    width: number;
    disappearWidth: number;
  }[];
  setSort: any;
  sort: { column: string; isDesc: boolean };
}

const ListHeader: FC<ListHeaderProps> = ({ listHeaders, setSort, sort }) => {
  const [click, setClick] = useState<number>(1);

  const { width } = useWindowDimensions();

  useEffect(() => {
    setSort({ column: sort.column, isDesc: true });
  }, [sort.column]);

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

  return (
    <div className={cls.list_headers}>
      {listHeaders.map((item) =>
        item.disappearWidth <= width ? (
          <div
            className={cls.list_headers__item}
            style={{ width: `${item.width}px` }}
            key={item.sort}
          >
            <button
              className={[cls.list_headers__button].join(' ')}
              onClick={(e) => sortButtonHandler(e, item)}
            >
              {item.title}
            </button>
            <div
              style={
                item.sort === sort.column ? { opacity: '1' } : { opacity: '0' }
              }
              className={cls.list_headers__triangle}
              key={`${item.sort}_${item.title}`}
            >
              <TriangleArrow isUp={sort.isDesc} color={'black'} />
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default ListHeader;
