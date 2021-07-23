import ModalLoading from 'components/Loading/ModalLoading';
import MessageModal from 'components/Modal/MessageModal';
import { setTransition } from 'modules/transition';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDelete,
  MdAdd,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTransition,
  deleteTransition,
  getTransitions,
  toggleTransition,
  updateTransition,
} from 'utils/api/transition';
import { doubleSubmitCheck } from 'utils/doubleSubmitCheck';
import './TransitionList.scss';

const TransitionList = ({ date }) => {
  const { year, month, day } = date;
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shop);
  const user = useSelector((state) => state.user);
  const transition = useSelector((state) => state.transition);
  const curdate = new Date();
  const [currentDate, setCurrentDate] = useState({
    curYear: curdate.getFullYear(),
    curMonth: curdate.getMonth() + 1,
    curDay: curdate.getDate(),
  });

  const { curYear, curMonth, curDay } = currentDate;
  const [transitions, setTransitions] = useState([]);
  const [description, setDescription] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [messageModalState, setMessageModalState] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  const onChangeDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoadingState(false);
      const transitions = await getTransitions(shop._id, year, month, day);
      setTransitions(transitions);
      setLoadingState(true);
    };
    if (shop._id) {
      getData();
    }
  }, [shop, year, month, day]);

  // 인수인계 추가
  const onCreate = useCallback(async () => {
    try {
      const transitions = await createTransition(
        shop._id,
        `${year}-${month}-${day}`,
        description,
        user._id,
      );
      setTransitions(transitions);
      setDescription('');
    } catch (e) {
      alert('인수인계 추가에 실패하였습니다.');
    }
  }, [day, month, shop._id, year, user._id, description]);

  // 인수인계 삭제
  const onDelete = useCallback(async () => {
    try {
      const transitions = await deleteTransition(shop._id, transition._id);
      setMessageModalState(!messageModalState);
      setTransitions(transitions);
    } catch (e) {
      alert('인수인계 삭제에 실패했습니다.');
    }
  }, [messageModalState, shop._id, transition._id]);

  const onChangeDescriptionUpdate = useCallback((e) => {
    setUpdateDescription(e.target.innerText);
  }, []);

  // 인수인계 수정
  const onUpdate = useCallback(
    async (e) => {
      try {
        const transitions = await updateTransition(
          shop._id,
          e.target.id,
          updateDescription,
          user._id,
        );
        setTransitions(transitions);
      } catch (e) {
        alert('인수인계 수정에 실패하였습니다.');
      }
    },
    [updateDescription, shop._id, user._id],
  );

  // 인수인계 체크박스
  const onToggle = useCallback(
    async (transitionId) => {
      try {
        const transitions = await toggleTransition(
          shop._id,
          transitionId,
          user._id,
        );
        setTransitions(transitions);
      } catch (e) {
        alert('인수인계 체크박스를 실패하였습니다.');
      }
    },
    [shop._id, user._id],
  );

  const messageModalToggle = useCallback(
    (transition) => {
      setMessageModalState(!messageModalState);
      dispatch(setTransition(transition));
    },
    [dispatch, messageModalState],
  );
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
