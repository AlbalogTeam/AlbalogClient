import React from 'react';
import './MessageModal.scss';
import { AiOutlineClose } from 'react-icons/ai';

const MessageModal = () => {
  return (
    <div id="MessageModal">
      <div className="message-alert">
        <div className="message-wrapper">
          <div className="wrapper-header">알림</div>
          <div className="wrapper-content">
            <p className="content-message">정말로 삭제하시겠습니까??</p>
          </div>
          <button className="wrapper-button">
            <AiOutlineClose size="30" />
          </button>
        </div>
        <div className="message-footer">
          <button className="message-btn">삭제</button>
          <button className="message-btn last">취소</button>
        </div>
      </div>
      <div className="message-background"></div>
    </div>
  );
};

export default MessageModal;
