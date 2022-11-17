import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import cls from './Pagination.module.scss';
import Loader from '../UI/Loader/Loader';

interface PaginationProps {
  total: number;
  perPage: number;
}

const Pagination: FC<PaginationProps> = ({ total, perPage }) => {
  const totalPages = Math.ceil(total / perPage);
  const { page } = useParams();
  const nav = useNavigate();

  const handlePageClick = (e: { selected: number }) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return nav(`/coin-list/${e.selected + 1}`);
  };

  return (
    <div className={cls.pagination__container}>
      {page ? (
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageClick}
          containerClassName={cls.pagination}
          activeClassName={cls.active}
          pageLinkClassName={cls.item}
          pageRangeDisplayed={8}
          initialPage={parseInt(page) - 1}
          nextLabel=">"
          previousLabel="<"
          previousClassName={cls.item}
          nextClassName={cls.item}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Pagination;
