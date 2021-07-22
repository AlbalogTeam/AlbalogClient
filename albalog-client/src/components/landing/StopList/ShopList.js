import Loading from 'components/Loading/Loading';
import useShopEdit from 'hooks/shop/useShopEdit';
import useShopListEffect from 'hooks/shop/useShopListEffect';
import React from 'react';
import ShopForm from '../ShopForm';

import './ShopList.scss';

const ShopList = () => {
  const { locations, loading, user } = useShopListEffect();
  const { onEditHandler, onToggle, isEditModal, onEdit } = useShopEdit();

  return (
    <div id="ShopList">
      {loading === true ? (
        <Loading />
      ) : (
        <ul>
          {locations.map((location) => (
            <li key={location._id}>
              <div className="store-enter">
                {user.role === 'owner' && (
                  <button
                    type="button"
                    onClick={() => onEditHandler(location)}
                    className="btn"
                  >
                    수정
                  </button>
                )}

                {user.role === 'owner' && (
                  <a className="btn" href={`/admin/${location._id}`}>
                    입장
                  </a>
                )}
                {user.role === 'staff' && (
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
      {isEditModal && <ShopForm onSubmit={onEdit} ToggleButton={onToggle} />}
    </div>
  );
};

export default ShopList;
