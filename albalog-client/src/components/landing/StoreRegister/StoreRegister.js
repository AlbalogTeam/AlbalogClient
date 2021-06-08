import React, { useState } from 'react';
import './StoreRegister.scss';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { APIURL } from 'CONST';
import { connect } from 'react-redux';
import { SetShop } from 'modules/shop';

const StoreRegister = ({ ToggleButton, user, dispatchSetShop }) => {
  const [address, setAddress] = useState('');
  const [addressSearchOpen, setAddressSearchOpen] = useState(false);
  const [storeRegisterForm, setStoreRegisterForm] = useState({
    storeName: '',
    addressDetail: '',
    phoneNumber: '',
  });

  const { storeName, addressDetail, phoneNumber } = storeRegisterForm;

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
      ...storeRegisterForm,
      [name]: value,
    };
    console.log(ChangeForm);
    setStoreRegisterForm(ChangeForm);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let StoreRegisterBody = {
      name: storeName,
      address,
      postal_code: addressDetail,
      phone_number: phoneNumber,
    };

    axios
      .post(`${APIURL}/location`, StoreRegisterBody, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response);

        let shopBody = {
          _id: response.data.location._id,
          name: response.data.location.name,
        };

        dispatchSetShop(shopBody);
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
    <div id="StoreRegister" onClick={ToggleButton}>
      <div className="regi-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-tit">
          <h2>매장 추가</h2>
        </div>
        <div className="modal-form">
          <form action="" onSubmit={onSubmit}>
            <label>매장 이름</label>
            <input
              type="text"
              name="storeName"
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
              <button type="button" onClick={PostOpen}>
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
            />

            <label>휴대폰 번호</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="휴대폰번호를 - 없이 입력해주세요"
              onChange={onChange}
            />
            <p>
              사업자 등록증을 developer@dev.lop 로 <br />
              보내주시면 승인 후 매장 등록이 완료됩니다
            </p>
            <div className="modal-btn">
              <button type="submit">등록</button>
              <button type="button" onClick={ToggleButton}>
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
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchSetShop: (ShopBody) => dispatch(SetShop(ShopBody)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreRegister);
