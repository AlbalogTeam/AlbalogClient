import Loading from 'components/Loading/Loading';
import { SetShop } from 'modules/shop';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import client from 'utils/api';
import StoreEdit from '../StoreEdit/StoreEdit';
import './StoreList.scss';

const StoreList = ({ user, dispatchSetshop }) => {
  const role = user.role;
  const [locations, setLocations] = useState([]);
  const [dataState, setDataState] = useState(0);
  const [editState, setEditState] = useState(false);
  useEffect(() => {
    if (role === 'owner') {
      client
        .get(`/owner/me/locations`)
        .then((response) => {
          setLocations(response.data.locations);
          setDataState(1);
        })
        .catch((error) => {
          setDataState(1);
        });
    } else if (role === 'staff') {
      client
        .get(`/employee/locations`)
        .then((response) => {
          setLocations(response.data.locations);
          setDataState(1);
        })
        .catch((error) => {
          setDataState(1);
        });
    }
  }, [role]);

  const StateToggleButton = () => {
    setEditState(!editState);
  };

  const EditHandle = (location) => {
    StateToggleButton();

    let shopBody = {
      _id: location._id,
      name: location.name,
      notices: location.notices,
      workManuals: location.workManuals,
      address: location.address,
      phone_number: location.phone_number,
      postal_code: location.postal_code,
    };

    dispatchSetshop(shopBody);
  };

  return (
    <div id="StoreList">
      {dataState === 0 ? (
        <Loading />
      ) : (
        <ul>
          {locations.map((location) => (
            <li key={location._id}>
              <div className="store-enter">
                {role === 'owner' && (
                  <button
                    type="button"
                    onClick={() => EditHandle(location)}
                    className="btn"
                  >
                    수정
                  </button>
                )}

                {role === 'owner' && (
                  <a className="btn" href={`/admin/${location._id}`}>
                    입장
                  </a>
                )}
                {role === 'staff' && (
                  <a className="btn" href={`/parttime/${location._id}`}>
                    입장
                  </a>
                )}
              </div>

              <div className="store-info">
                <span className="name">{location.name}</span>
                <br />
                <span className="detail">{location.address}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      {editState && <StoreEdit StateToggleButton={StateToggleButton} />}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchSetshop: (ShopBody) => dispatch(SetShop(ShopBody)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreList);
