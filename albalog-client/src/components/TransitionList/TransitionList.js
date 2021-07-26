import ModalLoading from 'components/Loading/ModalLoading';
import MessageModal from 'components/Modal/MessageModal';
import NoDataType1 from 'components/NoData/NoDataType1';

import React, { useState } from 'react';

import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDelete,
  MdAdd,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import './TransitionList.scss';
import TransitionIMG from 'static/Transition.png';
import useTransitionHandle from 'hooks/transition/useTransitionHandle';

const TransitionList = ({ date }) => {
  const { year, month, day } = date;
  const curdate = new Date();
  const [currentDate, setCurrentDate] = useState({
    curYear: curdate.getFullYear(),
    curMonth: curdate.getMonth() + 1,
    curDay: curdate.getDate(),
  });

  const { curYear, curMonth, curDay } = currentDate;

  const {
    onCreate,
    onDelete,
    onUpdate,
    onToggle,
    onChangeDescription,
    onChangeDescriptionUpdate,
    messageModalToggle,
    transitions,
    description,
    loadingState,
    messageModalState,
  } = useTransitionHandle(date);

  return (
    <div id="TransitionList">
      <div className="current-date">
        <h4>
          {year}년 {month}월 {day}일
        </h4>
      </div>
      <div className="transition-input">
        {year === curYear && month === curMonth && day === curDay ? (
          <>
            <input
              className="input-active"
              type="text"
              value={description}
              onChange={onChangeDescription}
              placeholder="전달 사항을 입력해 주세요"
            />
            <button type="button" onClick={onCreate} className="add">
              <MdAdd size="24" />
            </button>
          </>
        ) : (
          <input
            type="text"
            className="input-disable"
            placeholder="당일만 입력 가능합니다."
            readOnly
          />
        )}
      </div>
      <div className="transition-list">
        {loadingState && transitions ? (
          <ul>
            {transitions.length < 1 ? (
              <NoDataType1 text={'인수인계가 없습니다'} img={TransitionIMG} />
            ) : (
              ''
            )}
            {transitions &&
              transitions.map((transition, index) => (
                <li key={index}>
                  <div
                    className={`tran-cont ${
                      transition.completed ? 'completed' : ''
                    }`}
                  >
                    <button
                      className="tran-check"
                      onClick={() => onToggle(transition._id)}
                    >
                      {transition.completed ? (
                        <MdCheckBox size="22" className="check-box" />
                      ) : (
                        <MdCheckBoxOutlineBlank size="22" />
                      )}
                    </button>
                    <div
                      onInput={onChangeDescriptionUpdate}
                      contentEditable="true"
                      suppressContentEditableWarning={true}
                      className="title"
                      onBlur={onUpdate}
                      id={transition._id}
                    >
                      {transition.description}
                    </div>

                    <button
                      type="button"
                      className="del-btn"
                      onClick={() => messageModalToggle(transition)}
                      name="삭제"
                    >
                      <MdDelete size="30" />
                    </button>
                  </div>

                  <div className="tran-who">
                    <div className="tran-writer who">
                      등록 :<span>{transition.who_worked[0].name}</span>
                    </div>
                    {transition.modify_person[0] && (
                      <div className="tran-modify who">
                        마지막 수정 :
                        <span>
                          {
                            transition.modify_person[
                              transition.modify_person.length - 1
                            ].name
                          }
                        </span>
                      </div>
                    )}
                    {transition.who_worked[1] && (
                      <div className="tran-checked who">
                        {transition.who_worked[transition.who_worked.length - 1]
                          .completed === true ? (
                          <div className="complete">
                            완료 :
                            {
                              transition.who_worked[
                                transition.who_worked.length - 1
                              ].name
                            }
                          </div>
                        ) : (
                          <div className="cancel">
                            취소 :
                            {
                              transition.who_worked[
                                transition.who_worked.length - 1
                              ].name
                            }
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            {messageModalState && (
              <MessageModal
                messageModalToggle={messageModalToggle}
                deleteCont={onDelete}
              />
            )}
          </ul>
        ) : (
          <ModalLoading />
        )}
      </div>
    </div>
  );
};

export default TransitionList;
