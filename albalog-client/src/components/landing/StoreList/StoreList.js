import Loading from 'components/Loading/Loading';
import { SetShop } from 'modules/shop';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  getShopForOwner,
  getShopForParttime,
  updateShop,
} from 'utils/api/shop';
import ShopForm from '../ShopForm';

import './StoreList.scss';

const StoreList = ({ user, dispatchSetshop }) => {
  const role = user.role;
  const [locations, setLocations] = useState([]);
  const [dataState, setDataState] = useState(0);
  const [editState, setEditState] = useState(false);
  const shop = useSelector((state) => state.shop);
  const { name, postal_code, phone_number, address } = shop;

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await updateShop(name, address, postal_code, phone_number, shop._id);
        window.location.reload();
      } catch (e) {
        alert('수정에 실패했습니다.');
      }
    },
    [name, address, postal_code, phone_number, shop._id],
  );
  useEffect(() => {
    const getDataForOwner = async () => {
      try {
        const locations = await getShopForOwner();
        setLocations(locations);
        setDataState(1);
      } catch (e) {
        setDataState(1);
      }
    };

    const getDataForParttime = async () => {
      try {
        const locations = await getShopForParttime();
        setLocations(locations);
        setDataState(1);
      } catch (e) {
        setDataState(1);
      }
    };

    if (role === 'owner') {
      getDataForOwner();
    } else {
      getDataForParttime();
    }
  }, [role]);

  const StateToggleButton = useCallback(() => {
    setEditState(!editState);
  }, [editState]);

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
      {editState && (
        <ShopForm onSubmit={onSubmit} ToggleButton={StateToggleButton} />
      )}
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
