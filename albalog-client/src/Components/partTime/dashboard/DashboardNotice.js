import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'components/partTime/dashboard/DashboardNotice.scss';

function DashboardNotice() {
  const [sample, setSample] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts/')
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setSample(data);
      });
  }, []);

  //   const fetchSample = async () => {
  //     try {
  //       setError(null);
  //       setSample(null);
  //       setLoading(true);
  //       let response = await axios.get(
  //         'https://jsonplaceholder.typicode.com/posts/1',
  //       );
  //       setSample(response.data);
  //     } catch (e) {
  //       setError(e);
  //     }
  //     setLoading(false);
  //   };
  //   fetchSample();
  // }, []);

  // if (loading) return <div>로딩중..</div>;
  // if (error) return <div>에러가 발생했습니다 {console.log(error)}</div>;
  // if (!sample) return <div>{console.log(sample)}</div>;

  return (
    <div id="DashboardNotice">
      <div className="tr-head">
        <div className="td1-head">날짜</div>
        <div className="td2-head">제목</div>
        <div className="td3-head">작성자</div>
      </div>
      {/* {post()} */}
      {sample.map((data) => {
        if (data.id < 3)
          return (
            <div className="tr">
              <div className="td1">{data.id}</div>
              <div className="td2">{data.title}</div>
              <div className="td3">{data.userId}</div>
            </div>
          );
      })}
    </div>
  );
}

export default DashboardNotice;
