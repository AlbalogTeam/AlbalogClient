import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './NoticeDetail';

const NoticeDetail = ({ match }) => {
  const noticeId = match.params.id;
  const [noticeInfo, setNoticeInfo] = useState({
    title: '',
    body: '',
  });

  const { title, body } = noticeInfo;

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${noticeId}`)
      .then((response) => {
        console.log(response.data);
        setNoticeInfo({
          ...noticeInfo,
          title: response.data.title,
          body: response.data.body,
        });
      });
  }, []);
  return (
    <div id="NoticeDetail">
      {title}
      {body}
    </div>
  );
};

export default NoticeDetail;
