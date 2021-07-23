import useEmployeeInfo from 'hooks/admin/useEmployeeInfo';
import React from 'react';
import './Modal.scss';

const EmployeeInfoModal = ({ handleModal, data }) => {
  const {
    birthdate,
    cellphone,
    changeStatus,
    changeWage,
    email,
    gender,
    name,
    onSubmit,
    isStatus,
    wage,
  } = useEmployeeInfo(data);

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
            className="btn btn-invite"
            onClick={onSubmit}
            onChange={changeStatus}
          >
            수정하기
          </button>
          <button className="btn btn-close" onClick={handleModal}>
            닫기
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeInfoModal;
