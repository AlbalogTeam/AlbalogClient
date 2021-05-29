import React from 'react';
import _ from 'lodash';
import {
  AiOutlineDoubleLeft,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineDoubleRight,
} from 'react-icons/ai';

const Pagination = ({ pageCount, currentPage, onPageChange }) => {
  //   const pageCount = Math.ceil(contentCount / pageSize); // 몇 페이지가 필요한지 계산

  if (pageCount === 1) return null; // 페이지가 1개뿐이면 페이지 수를 보여주지 않음

  const pages = _.range(1, pageCount + 1); // 마지막 페이지에 보여줄 컨텐츠를 위해 +1을 해줌 https://lodash.com/docs/#range 참고
  return (
    <div className="inner-paging">
      <a
        href={() => false}
        onClick={() => onPageChange(1)}
        className="paging-btn paging-fst"
      >
        <AiOutlineDoubleLeft size="14" />
      </a>
      <a
        href={() => false}
        onClick={() => onPageChange(currentPage - 1)}
        className="paging-btn paging-prev"
      >
        <AiOutlineLeft size="14" />
      </a>
      <ul>
        {pages.map((page, index) => (
          <li key={index} className="paging-link">
            <a
              href={() => false}
              className={page === currentPage ? 'active' : ''}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
      <a
        href={() => false}
        onClick={() => onPageChange(currentPage + 1)}
        className="paging-btn paging-next"
      >
        <AiOutlineRight size="14" />
      </a>
      <a
        href={() => false}
        onClick={() => onPageChange(pages.length)}
        className="paging-btn paging-last"
      >
        <AiOutlineDoubleRight size="14" />
      </a>
    </div>
  );
};

export default Pagination;
