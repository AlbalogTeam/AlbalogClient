import React from 'react';
import './MessageModal.scss';
import { AiOutlineClose } from 'react-icons/ai';

const MessageModal = ({
  messageModalToggle,
  deleteCont,
  message = '정말 삭제하시겠습니까?',
  alert = '',
}) => {
  return (
    <div id="MessageModal">
      <div className="message-alert">
        <div className="message-wrapper">
          <div className="wrapper-header">알림</div>
          <div className="wrapper-content">
            <p className="content-message">{message}</p>
          </div>
          <div className="wrapper-alert">{alert}</div>
          <button
            onClick={messageModalToggle}
            type="button"
            className="wrapper-button"
          >
            <AiOutlineClose size="30" />
          </button>
        </div>
        <div className="message-footer">
          <button onClick={deleteCont} className="message-btn">
            삭제
          </button>
          <button
            type="button"
            onClick={messageModalToggle}
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

export default MessageModal;
