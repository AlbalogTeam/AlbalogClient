import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { patchEmployeeInfoByAdmin } from 'utils/api/user';
import './Modal.scss';

const Modal = ({ handleModal, data }) => {
  const {
    _id,
    name,
    email,
    birthdate,
    cellphone,
    gender,
    status,
    hourly_wage,
  } = data;

  const [wage, setWage] = useState(hourly_wage);
  const [isStatus, setIsStatus] = useState(status);
  const locationId = useSelector(({ shop }) => shop._id);
  const shop = useSelector((state) => state.shop);

  const changeWage = (e) => {
    setWage(e.target.value);
  };

  const changeStatus = (e) => {
    setIsStatus(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        hourly_wage: Number(wage),
        status: isStatus,
      };
      const response = await patchEmployeeInfoByAdmin(
        { locationId, _id },
        requestBody,
      );
      alert('변경성공');
      if (response.status === 200) {
        window.location.replace(`/admin/${shop._id}/employeelist`); // 페이지 이동 후 새로고침
      }
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-wrap">
        <h2 className="invite-title">직원정보</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="name">이름</label>
          <input type="text" disabled value={name} id="name" />

          <label htmlFor="gender">성별</label>
          <input type="text" disabled value={gender} id="gender" />

          <label htmlFor="email">이메일</label>
          <input type="text" disabled value={email} id="email" />

          <label htmlFor="birthdate">생년월일</label>

          <input
            type="text"
            disabled
            value={birthdate.slice(0, 10)}
            id="birthdate"
          />

          <label htmlFor="cellphone">핸드폰번호</label>
          <input type="text" disabled value={cellphone} id="cellphone" />

          <label htmlFor="hourly_wage">시급</label>
          <input
            type="text"
            value={wage}
            id="hourly_wage"
            onChange={changeWage}
          />

          <label htmlFor="status">재직유무</label>
          <div className="radio-group">
            <div className="radio">
              <input
                type="radio"
                value="재직자"
                onChange={changeStatus}
                checked={isStatus === '재직자' ? true : false}
              />
              <label htmlFor="">재직자</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                value="퇴직자"
                onChange={changeStatus}
                checked={isStatus === '퇴직자' ? true : false}
              />
              <label htmlFor="">퇴직자</label>
            </div>
          </div>

          <button
            className="btn-invite"
            onClick={onSubmit}
            onChange={changeStatus}
          >
            수정하기
          </button>
          <button className="btn-close" onClick={handleModal}>
            닫기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
