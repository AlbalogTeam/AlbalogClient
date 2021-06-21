import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './Modal.scss';

const ScheduleModal = ({ handleModal, employeeList }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [id, setId] = useState('');
  const [days, setDays] = useState([
    {
      Mon: {
        startTime: '',
        endTime: '',
      },
    },
    {
      Tue: {
        startTime: '',
        endTime: '',
      },
    },
    {
      Wed: {
        startTime: '',
        endTime: '',
      },
    },
    {
      Thu: {
        startTime: '',
        endTime: '',
      },
    },
    {
      Fri: {
        startTime: '',
        endTime: '',
      },
    },
    {
      Sat: {
        startTime: '',
        endTime: '',
      },
    },
    {
      Sun: {
        startTime: '',
        endTime: '',
      },
    },
  ]);

  const employeeChange = (e) => {
    setId(e.target.value);
  };

  const changeTime = (e) => {};

  const onSubmit = (e) => {
    e.preventDefault();

    console.log({
      _id: id,
      startDate: startDate.toISOString().substring(0, 10),
      endDate: endDate.toISOString().substring(0, 10),
      time: days,
    });
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
              <option value={employee.employee._id}>
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
            <input
              type="time"
              name="Mon"
              id="startTime"
              onChange={changeTime}
            />
            ~
            <input type="time" name="Mon" id="endTime" onChange={changeTime} />
          </div>

          <label>화요일</label>
          <div className="choose-time">
            <input
              type="time"
              name="Tue"
              id="startTime"
              onChange={changeTime}
            />
            ~
            <input type="time" name="Tue" id="endTime" onChange={changeTime} />
          </div>

          <label>수요일</label>
          <div className="choose-time">
            <input
              type="time"
              name="Wed"
              id="startTime"
              onChange={changeTime}
            />
            ~
            <input type="time" name="Wed" id="endTime" onChange={changeTime} />
          </div>

          <label>목요일</label>
          <div className="choose-time">
            <input
              type="time"
              name="Thu"
              id="startTime"
              onChange={changeTime}
            />
            ~
            <input type="time" name="Thu" id="endTime" onChange={changeTime} />
          </div>

          <label>금요일</label>
          <div className="choose-time">
            <input
              type="time"
              name="Fri"
              id="startTime"
              onChange={changeTime}
            />
            ~
            <input type="time" name="Fri" id="endTime" onChange={changeTime} />
          </div>

          <label>토요일</label>
          <div className="choose-time">
            <input
              type="time"
              name="Sat"
              id="startTime"
              onChange={changeTime}
            />
            ~
            <input type="time" name="Sat" id="endTime" onChange={changeTime} />
          </div>

          <label>일요일</label>
          <div className="choose-time">
            <input
              type="time"
              name="Sun"
              id="startTime"
              onChange={changeTime}
            />
            ~
            <input type="time" name="Sun" id="endTime" onChange={changeTime} />
          </div>

          <button className="btn-invite">추가하기</button>
          <button className="btn-close" onClick={handleModal}>
            닫기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
