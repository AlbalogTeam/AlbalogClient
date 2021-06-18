import React, { useState, useEffect } from 'react';
import 'components/partTime/dashboard/DashboardNotice.scss';
import { useSelector } from 'react-redux';
import client from 'utils/api';
import axios from 'axios';

function DashboardNotice() {
  // const [samples, setSamples] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const shop = useSelector((state) => state.shop);
  console.log(shop);
  const notices = shop.notices;
  // useEffect(() => {

  //   axios
  //     .get('https://jsonplaceholder.typicode.com/posts/')
  //     .then((response) => response.data)
  //     .then((data) => {
  //       console.log(data);
  //       setSamples(data);
  //     });
  // }, []);

  //   const fetchSamples = async () => {
  //     try {
  //       setError(null);
  //       // setSamples(null);
  //       setLoading(true);
  //       let response = await axios.get(`/${shop._id}/notice`);
  //       console.log('공지사항' + response.data);
  //       setSamples(response.data.notices);
  //     } catch (e) {
  //       setError(e);
  //     }
  //     setLoading(false);
  //   };
  //   fetchSamples();
  // }, []);

  // if (loading) return <div>로딩중..</div>;
  // if (error) return <div>에러가 발생했습니다 {console.log(error)}</div>;
  // if (!samples) return <div>{console.log(samples)}</div>;

  return (
    <div id="DashboardNotice">
      <div className="tr-head">
        <div className="td1-head">날짜</div>
        <div className="td2-head">제목</div>
      </div>
      {shop &&
        notices.slice(0, 2).map((data) => (
          <div className="tr" key={data.id}>
            <div className="td1">{data.createdAt.slice(0, 10)}</div>
            <div className="td2">{data.title}</div>
          </div>
        ))}
    </div>
  );
}

export default DashboardNotice;
