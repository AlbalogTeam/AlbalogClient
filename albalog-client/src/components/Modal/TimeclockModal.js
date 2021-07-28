import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './TimeclockModal.scss';

const TimeclockModal = ({
  message,
  timeClockModalToggle,
  clickClockIn,
  clickClockOut,
}) => {
  return (
    <div id="TimeclockModal">
      <div className="message-alert">
        <div className="message-wrapper">
          <div className="wrapper-header">알림</div>
          <div className="wrapper-content">
            <p className="content-message">{message}</p>
          </div>
          <button
            onClick={timeClockModalToggle}
            type="button"
            className="wrapper-button"
          >
            <AiOutlineClose size="30" />
          </button>
        </div>
        <div className="message-footer">
          <button
            onClick={clickClockIn || clickClockOut}
            className="message-btn"
          >
            확인
          </button>
          <button
            type="button"
            onClick={timeClockModalToggle}
            className="message-btn last"
          >
            취소
          </button>
        </div>
      </div>
      <div className="message-background"></div>
    </div>
  );
};

export default TimeclockModal;
