import axios from 'axios';
import Loading from 'components/Loading/Loading';
import { APIURL } from 'config';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './StoreList.scss';

const StoreList = ({ user }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get(`${APIURL}/owner/me/locations`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setLocations(response.data.locations);
      });
  }, []);

  return (
    <div id="StoreList">
      <ul>
        {locations.map((location) => (
          <li key={location._id}>
            <div className="store-enter">
              <a className="btn" href="/">
                수정
              </a>
              <a className="btn" href={`/admin/${location._id}`}>
                입장
              </a>
            </div>

            <div className="store-info">
              <span className="name">{location.name}</span>
              <br />
              <span className="detail">{location.address}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(StoreList);
