import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdModeEdit,
  MdDelete,
  MdAdd,
} from 'react-icons/md';

const TransitionList = ({ date }) => {
  const { year, month, day } = date;

  const [getTransition, setGetTransition] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos').then((response) => {
      console.log(response.data.slice(7, 17));
      setGetTransition(response.data.slice(7, 17));
    });
  }, []);
  return (
    <div id="TransitionList">
      <div className="current-date">
        <h4>
          {year}년 {month}월 {day}일
        </h4>
      </div>
      <div className="transition-input">
        <input type="text" placeholder="전달 사항을 입력해 주세요" />
        <button className="add">
          <MdAdd size="24" />
        </button>
      </div>
      <div className="transition-list">
        <ul>
          {getTransition &&
            getTransition.map((transition, index) => (
              <li key={index}>
                <div
                  className={`tran-cont ${
                    transition.completed ? 'completed' : ''
                  }`}
                >
                  <button>
                    {transition.completed ? (
                      <MdCheckBox size="22" className="check-box" />
                    ) : (
                      <MdCheckBoxOutlineBlank size="22" />
                    )}
                  </button>
                  <div className="title">{transition.title}</div>

                  <button name="수정">
                    <MdModeEdit size="22" />
                  </button>
                  <button name="삭제">
                    <MdDelete size="22" />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TransitionList;
