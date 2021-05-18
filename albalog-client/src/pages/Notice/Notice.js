import React from 'react';
import './Notice.scss';
import {
  AiOutlineDoubleLeft,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineDoubleRight,
  AiOutlineSearch,
} from 'react-icons/ai';

const Notice = () => {
  return (
    <div id="Notice">
      <div className="notice-tit">
        <h4 className="tit-corp">공지사항</h4>
      </div>
      <div className="notice-cont">
        <div className="search-comm">
          <form action="">
            <fieldset>

              <input type="text" className="search-input" placeholder="검색어를 입력해주세요" />
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
              <tr>
                <td className="td-left">
                  <div className="inner-cont">
                    <span className="inner-text">
                      <a href="" className="link-text">
                        5월달 할인 이벤트 종류 입니다.
                      </a>
                    </span>
                  </div>
                </td>
                <td>
                  <div className="inner-cont">2021-05-19</div>
                </td>
              </tr>

              <tr>
                <td className="td-left">
                  <div className="inner-cont">
                    <span className="inner-text">
                      <a href="" className="link-text">
                        5월달 할인 이벤트 종류 입니다.
                      </a>
                    </span>
                  </div>
                </td>
                <td>
                  <div className="inner-cont">2021-05-19</div>
                </td>
              </tr>

              <tr>
                <td className="td-left">
                  <div className="inner-cont">
                    <span className="inner-text">
                      <a href="" className="link-text">
                        5월달 할인 이벤트 종류 입니다.
                      </a>
                    </span>
                  </div>
                </td>
                <td>
                  <div className="inner-cont">2021-05-19</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="paging-comm">
          <div className="inner-paging">
            <a href="" className="paging-btn paging-fst">
              <AiOutlineDoubleLeft size="14" />
            </a>
            <a href="" className="paging-btn paging-prev">
              <AiOutlineLeft size="14" />
            </a>
            <a href="" className="paging-link active">
              1
            </a>
            <a href="" className="paging-link">
              2
            </a>
            <a href="" className="paging-link">
              3
            </a>
            <a href="" className="paging-btn paging-next">
              <AiOutlineRight size="14" />
            </a>
            <a href="" className="paging-btn paging-last">
              <AiOutlineDoubleRight size="14" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
