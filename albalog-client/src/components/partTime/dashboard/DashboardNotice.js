import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'components/partTime/dashboard/DashboardNotice.scss';

function DashboardNotice() {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    //   axios
    //     .get('https://jsonplaceholder.typicode.com/posts/')
    //     .then((response) => response.data)
    //     .then((data) => {
    //       console.log(data);
    //       setSamples(data);
    //     });
    // }, []);
    const locationId = '60bc87746f9dca0028ea46ea';

    const fetchSamples = async () => {
      try {
        setError(null);
        // setSamples(null);
        setLoading(true);
        let response = await axios.get(
          `https://albalog-test.herokuapp.com/api/v1//location/${locationId}/notice`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJjODcyZTZmOWRjYTAwMjhlYTQ2ZTgiLCJyb2xlIjoib3duZXIiLCJzdG9yZXMiOlt7Il9pZCI6IjYwYmM4Nzc0NmY5ZGNhMDAyOGVhNDZlYiIsImxvY2F0aW9uIjoiNjBiYzg3NzQ2ZjlkY2EwMDI4ZWE0NmVhIn1dLCJpYXQiOjE2MjI5NzAyOTB9.1mkK52NkABTnIiAs1Ys1X5qmNf4CRK23jX7L4D-xAjo',
            },
          },
        );
        console.log(response.data);
        setSamples(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchSamples();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다 {console.log(error)}</div>;
  if (!samples) return <div>{console.log(samples)}</div>;

  return (
    <div id="DashboardNotice">
      <div className="tr-head">
        <div className="td1-head">날짜</div>
        <div className="td2-head">제목</div>
        <div className="td3-head">작성자</div>
      </div>
      {samples &&
        samples
          .filter((x) => x.id < 3)
          .map((data) => (
            <div className="tr" key={data.id}>
              <div className="td1">{data.id}</div>
              <div className="td2">{data.title}</div>
              <div className="td3">{data.userId}</div>
            </div>
          ))}
    </div>
  );
}

export default DashboardNotice;
