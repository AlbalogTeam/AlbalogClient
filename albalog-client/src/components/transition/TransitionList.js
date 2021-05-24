import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TransitionList = ({ date }) => {
  const { year, month, day } = date;

  const [getTransition, setGetTransition] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos').then((response) => {
      console.log(response.data.slice(1, 7));
      setGetTransition(response.data.slice(1, 7));
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
        <button>추가</button>
      </div>
      <div className="transition-list">
        <ul>
          {getTransition &&
            getTransition.map((transition, index) => (
              <li key={index}>{transition.title}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TransitionList;
