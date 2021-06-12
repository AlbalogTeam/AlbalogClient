import axios from 'axios';
import { APIURL } from 'config';
import { SetShop } from 'modules/shop';
import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { connect } from 'react-redux';
import 'components/landing/StoreRegister/StoreRegister.scss';

const StoreEdit = ({
  StateToggleButton,
  user,
  shop,
  dispatchSetShop,
  history,
}) => {
  const [address, setAddress] = useState(shop.address);
  const [addressSearchOpen, setAddressSearchOpen] = useState(false);
  const [StoreEditForm, setStoreEditForm] = useState({
    storeName: shop.name,
    addressDetail: shop.postal_code,
    phoneNumber: shop.phone_number,
  });

  const { storeName, addressDetail, phoneNumber } = StoreEditForm;

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddress(fullAddress);
    setAddressSearchOpen(!addressSearchOpen);
  };

  const PostOpen = () => {
    setAddressSearchOpen(!addressSearchOpen);
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    const ChangeForm = {
      ...StoreEditForm,
      [name]: value,
    };
    console.log(ChangeForm);
    setStoreEditForm(ChangeForm);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let StoreEditBody = {
      name: storeName,
      address,
      postal_code: addressDetail,
      phone_number: phoneNumber,
    };

    axios
      .patch(`${APIURL}/location/${shop._id}/update`, StoreEditBody, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          window.location.reload(); // 새로고침
        }
      })
      .catch(function (error) {
        // status 코드가 200이 아닌경우 처리
        if (error) {
          alert('매장 생성에 실패했습니다.');
        }
      });
  };

  const postCodeStyle = {
    display: 'block',
    position: 'absolute',
    top: '0%',
    left: '0%',
    width: '430px',
    height: '541px',
    border: '1px solid black',
  };
  return (
    <div id="StoreEdit" onClick={StateToggleButton}>
      <div className="regi-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-tit">
          <h2>매장 수정</h2>
        </div>
        <div className="modal-form">
          <form action="" onSubmit={onSubmit}>
            <label>매장 이름</label>
            <input
              type="text"
              name="storeName"
              value={storeName}
              placeholder="매장 이름을 입력해주세요"
              onChange={onChange}
            />
            <label>매장 주소</label>
            <div className="address-search">
              <input
                type="text"
                readOnly
                placeholder="주소 검색을 통해 입력해주세요"
                className="address"
                value={address}
              />
              <button className="store-btn" type="button" onClick={PostOpen}>
                주소검색
              </button>
              {addressSearchOpen && (
                <DaumPostcode
                  style={postCodeStyle}
                  onComplete={handleComplete}
                />
              )}
            </div>
            <label>상세 주소</label>
            <input
              type="text"
              name="addressDetail"
              placeholder="상세 주소를 입력해주세요"
              onChange={onChange}
              value={addressDetail}
            />

            <label>휴대폰 번호</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="휴대폰번호를 - 없이 입력해주세요"
              onChange={onChange}
              value={phoneNumber}
            />
            <p>
              사업자 등록증을 developer@dev.lop 로 <br />
              보내주시면 승인 후 매장 등록이 완료됩니다
            </p>
            <div className="modal-btn">
              <button className="store-btn" type="submit">
                등록
              </button>
              <button
                className="store-btn"
                type="button"
                onClick={StateToggleButton}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { user: state.user, shop: state.shop };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchSetShop: (ShopBody) => dispatch(SetShop(ShopBody)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreEdit);
