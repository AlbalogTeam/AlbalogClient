import React, { useState } from 'react';
import './StoreRegister.scss';
import DaumPostcode from 'react-daum-postcode';

const StoreRegister = ({ ToggleButton }) => {
  const [address, setAddress] = useState('');
  const [addressSearchOpen, setAddressSearchOpen] = useState(false);

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

  const postCodeStyle = {
    display: 'block',
    position: 'absolute',
    top: '0%',
    left: '0%',
    width: '430px',
    height: '541px',
    border: '1px solid black',
  };

  const PostOpen = () => {
    setAddressSearchOpen(!addressSearchOpen);
  };

  return (
    <div id="StoreRegister" onClick={ToggleButton}>
      <div className="regi-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-tit">
          <h2>매장 추가</h2>
        </div>
        <div className="modal-form">
          <form action="">
            <label>매장 이름</label>
            <input type="text" placeholder="매장 이름을 입력해주세요" />
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
            <input type="text" placeholder="상세 주소를 입력해주세요" />
            <p>
              사업자 등록증을 developer@dev.lop 로 <br />
              보내주시면 승인 후 매장 등록이 완료됩니다
            </p>
            <div className="modal-btn">
              <button>등록</button>
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

export default StoreRegister;
