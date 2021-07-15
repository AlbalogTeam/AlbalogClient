import React, { useState } from 'react';
import client from 'utils/api';
import './DeleteAllScheduleModal.scss';

const DeleteAllScheduleModal = ({
  handleDeleteModal,
  employeeList,
  locationId,
}) => {
  const [id, setId] = useState('');

  const handleChangeId = (e) => {
    setId(e.target.value);
  };

  const handleDeleteScheduleSubmit = async (e) => {
    e.preventDefault();

    const isConfirm = window.confirm('정말 삭제하시겠습니까?');

    if (isConfirm) {
      try {
        await client.delete(
          `/shift/location/${locationId}/employee/${id}/deleteAll`,
        );
        handleDeleteModal();
      } catch (e) {
        console.error(e);
        alert('다시 시도해 주세요');
      }
    }
  };

  return (
    <div className="del-modal-container">
      <div className="del-modal-wrap">
        <h2 className="title">해당 직원 스케줄 전체 삭제</h2>
        <form onSubmit={handleDeleteScheduleSubmit}>
          <label>직원선택</label>
          <select onChange={handleChangeId}>
            <option>직원을 선택해주세요</option>
            {employeeList.map((employee) => (
              <option key={employee.employee._id} value={employee.employee._id}>
                {employee.employee.name}
              </option>
            ))}
          </select>
          <button className="btn-del" onClick={handleDeleteScheduleSubmit}>
            삭제하기
          </button>
          <button className="btn-close" onClick={handleDeleteModal}>
            닫기
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAllScheduleModal;
