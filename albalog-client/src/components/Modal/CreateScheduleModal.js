import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import { postSchedule } from 'utils/api/schedule';
import './Modal.scss';

const CreateScheduleModal = ({ handleCreateModal, employeeList }) => {
  const locationId = useSelector(({ shop }) => shop._id);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [id, setId] = useState('');
  const [days, setDays] = useState([
    { day: 0, start_time: '00:00', end_time: '00:00', checked: false },
    { day: 1, start_time: '00:00', end_time: '00:00', checked: false },
    { day: 2, start_time: '00:00', end_time: '00:00', checked: false },
    { day: 3, start_time: '00:00', end_time: '00:00', checked: false },
    { day: 4, start_time: '00:00', end_time: '00:00', checked: false },
    { day: 5, start_time: '00:00', end_time: '00:00', checked: false },
    { day: 6, start_time: '00:00', end_time: '00:00', checked: false },
  ]);

  const employeeChange = (e) => {
    setId(e.target.value);
  };

  // 원본을 훼손하지 않고 배열 수정.
  const changeTime = (e) => {
    setDays(
      days.map((day) =>
        day.day === Number(e.target.name)
          ? { ...day, [e.target.id]: e.target.value, checked: true }
          : day,
      ),
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        staffId: id,
        startDate: startDate.toISOString().substring(0, 10),
        endDate: endDate.toISOString().substring(0, 10),
        time: days.filter((day) => day.checked === true),
      };
      await postSchedule(locationId, requestBody);
      handleCreateModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-wrap">
        <h1 className="invite-title">스케줄 관리</h1>
        <form onSubmit={onSubmit}>
          <label>직원선택</label>
          <select onChange={employeeChange}>
            <option>직원을 선택해주세요</option>
            {employeeList.map((employee) => (
              <option key={employee.employee._id} value={employee.employee._id}>
                {employee.employee.name}
              </option>
            ))}
          </select>
          <label>시작날짜</label>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <label>종료날짜</label>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            minDate={startDate}
            endDate={endDate}
          />

          <label>월요일</label>
          <div className="choose-time">
            <input type="time" name={1} id="start_time" onChange={changeTime} />
            ~
            <input type="time" name={1} id="end_time" onChange={changeTime} />
          </div>

          <label>화요일</label>
          <div className="choose-time">
            <input type="time" name={2} id="start_time" onChange={changeTime} />
            ~
            <input type="time" name={2} id="end_time" onChange={changeTime} />
          </div>

          <label>수요일</label>
          <div className="choose-time">
            <input type="time" name={3} id="start_time" onChange={changeTime} />
            ~
            <input type="time" name={3} id="end_time" onChange={changeTime} />
          </div>

          <label>목요일</label>
          <div className="choose-time">
            <input type="time" name={4} id="start_time" onChange={changeTime} />
            ~
            <input type="time" name={4} id="end_time" onChange={changeTime} />
          </div>

          <label>금요일</label>
          <div className="choose-time">
            <input type="time" name={5} id="start_time" onChange={changeTime} />
            ~
            <input type="time" name={5} id="end_time" onChange={changeTime} />
          </div>

          <label>토요일</label>
          <div className="choose-time">
            <input type="time" name={6} id="start_time" onChange={changeTime} />
            ~
            <input type="time" name={6} id="end_time" onChange={changeTime} />
          </div>

          <label>일요일</label>
          <div className="choose-time">
            <input type="time" name={0} id="start_time" onChange={changeTime} />
            ~
            <input type="time" name={0} id="end_time" onChange={changeTime} />
          </div>

          <button className="btn-invite">추가하기</button>
          <button className="btn-close" onClick={handleCreateModal}>
            닫기
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateScheduleModal;
