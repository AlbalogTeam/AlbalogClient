import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notice.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import Pagination from 'components/notice/Pagination';
import { paginate } from 'utils/paginate';

const Notice = () => {
  const [getNotices, setGetNotices] = useState([]);
  const [noticeInfo, setNoticeInfo] = useState({
    pageSize: 10, // 한 페이지에 보여줄 공지사항 게시물 수
    currentPage: 1, // 현재 활성화 된 페이지 위치
  });

  const { pageSize, currentPage } = noticeInfo;

  // utils 함수에 있는 paginate로 화면에 보여줘야할 컨텐츠 개수의 배열을 가져옴
  const pagedNotices = paginate(getNotices, currentPage, pageSize);

  // https://jsonplaceholder.typicode.com/ fake 데이터 사용
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      console.log(response.data);
      setGetNotices(response.data);
    });
  }, []);
  const pageCount = Math.ceil(getNotices.length / pageSize); // 몇 페이지가 필요한지 계산
  const handlePageChange = (page) => {
    if (page >= pageCount) {
      page = pageCount;
    }
    if (page <= 1) {
      page = 1;
    }
    setNoticeInfo({
      ...noticeInfo,
      currentPage: page,
    });
  };

  return (
    <div id="Notice">
      <div className="notice-tit">
        <h4 className="tit-corp">공지사항</h4>
      </div>
      <div className="notice-cont">
        <div className="search-comm">
          <form action="">
            <fieldset>
              <input
                type="text"
                className="search-input"
                placeholder="검색어를 입력해주세요"
              />
              <button type="submit" className="search-btn">
                <AiOutlineSearch size="23" />
              </button>
            </fieldset>
          </form>
        </div>

        <div className="table-comm">
          <table className="table">
            <colgroup>
              <col style={{ width: '81%' }} />
              <col style={{ width: '19%' }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">내용</th>
                <th scope="col">등록일</th>
              </tr>
            </thead>
            <tbody>
              {pagedNotices.map((notice, index) => (
                <tr key={index}>
                  <td className="td-left">
                    <div className="inner-cont">
                      <span className="inner-text">
                        <a href={`/notice/${notice.id}`} className="link-text">
                          {notice.title}
                        </a>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="inner-cont">2021-05-19</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="paging-comm">
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            pageCount={pageCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Notice;
