import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'components/partTime/dashboard/DashboardNotice.scss';
import { APIURL } from 'config';
import { useSelector } from 'react-redux';

function DashboardNotice() {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const shop = useSelector((state) => state.shop);

  useEffect(() => {
    //   axios
    //     .get('https://jsonplaceholder.typicode.com/posts/')
    //     .then((response) => response.data)
    //     .then((data) => {
    //       console.log(data);
    //       setSamples(data);
    //     });
    // }, []);

    const fetchSamples = async () => {
      try {
        setError(null);
        // setSamples(null);
        setLoading(true);
        let response = await axios.get(`${APIURL}/${shop._id}/notice`, {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMxYjk4ZjM0NzVjZTAwMjg5MmZiODEiLCJyb2xlIjoib3duZXIiLCJzdG9yZXMiOlt7Il9pZCI6IjYwYzFiYzkyMzQ3NWNlMDAyODkyZmI4NCIsImxvY2F0aW9uIjoiNjBjMWJjOTIzNDc1Y2UwMDI4OTJmYjgzIn1dLCJpYXQiOjE2MjMzNzA1MjN9.Tz0RtqUtDCmJZBXwx4BWKn_k2lnzcpdcwrZlAr0rr_Q',
          },
        });
        console.log(response.data);
        setSamples(response.data.notices);
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
      </div>
      {samples &&
        samples
          // .filter((x) => x.id < 3)
          .map((data) => (
            <div className="tr" key={data.id}>
              <div className="td1">{data.createdAt.slice(0, 10)}</div>
              <div className="td2">{data.title}</div>
            </div>
          ))}
    </div>
  );
}

export default DashboardNotice;
