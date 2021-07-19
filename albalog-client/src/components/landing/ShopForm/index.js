import { SetShop, ShopFormField } from 'modules/shop';
import React, { useCallback, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { connect, useDispatch, useSelector } from 'react-redux';
import './styles.scss';

const ShopForm = ({ ToggleButton, onSubmit }) => {
  const [addressSearchOpen, setAddressSearchOpen] = useState(false);

  const shop = useSelector((state) => state.shop);
  const { name, postal_code, phone_number, address } = shop;

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
    dispatch(ShopFormField({ key: 'address', value: fullAddress }));
    setAddressSearchOpen(!addressSearchOpen);
  };

  const PostOpen = useCallback(() => {
    setAddressSearchOpen(!addressSearchOpen);
  }, [addressSearchOpen]);

  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;
    const body = {
      key: name,
      value,
    };
    dispatch(ShopFormField(body));
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
    <div id="ShopForm">
      <div className="regi-modal">
        <div className="modal-tit">
          <h2>매장 수정</h2>
        </div>
        <div className="modal-form">
          <form action="" onSubmit={onSubmit}>
            <label>매장 이름</label>
            <input
              type="text"
              name="name"
              value={name}
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
              name="postal_code"
              placeholder="상세 주소를 입력해주세요"
              onChange={onChange}
              value={postal_code}
            />

            <label>휴대폰 번호</label>
            <input
              type="text"
              name="phone_number"
              placeholder="휴대폰번호를 - 없이 입력해주세요"
              onChange={onChange}
              value={phone_number}
            />
            <p>
              사업자 등록증을 developer@dev.lop 로 <br />
              보내주시면 승인 후 매장 등록이 완료됩니다
            </p>
            <div className="modal-btn">
              <button className="upload btn" type="submit">
                수정
              </button>
              <button
                className="cancel btn"
                type="button"
                onClick={ToggleButton}
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

export default connect(mapStateToProps, mapDispatchToProps)(ShopForm);
