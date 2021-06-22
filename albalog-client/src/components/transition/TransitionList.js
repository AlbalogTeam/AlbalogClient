import ModalLoading from 'components/Loading/ModalLoading';
import React, { useEffect, useState } from 'react';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdModeEdit,
  MdDelete,
  MdAdd,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import client from 'utils/api';
import './TransitionList.scss';

const TransitionList = ({ date }) => {
  const { year, month, day } = date;
  const shop = useSelector((state) => state.shop);

  const [getTransition, setGetTransition] = useState('');
  const [transitionDescription, setTransitionDescription] = useState('');
  const [editTransitionDes, setEditTransition] = useState('');
  const [dataLoading, setDataLoading] = useState(1);
  const [changeData, setChangeData] = useState(false);

  const transitionDesOnChange = (e) => {
    setTransitionDescription(e.target.value);
  };

  useEffect(() => {
    setChangeData(0);
    async function fetchData() {
      const response = await client.get(
        `/transition/${shop._id}/${year}-${month}-${day}`,
      );

      console.log(response.data.satisfyTransitions);
      const newArr = [...response.data.satisfyTransitions].reverse();
      setGetTransition(newArr);
      setChangeData(1);
    }

    fetchData();
  }, [shop, year, month, day, dataLoading]);

  const addTransition = () => {
    let body = {
      locationId: shop._id,
      date: `${year}-${month}-${day}`,
      description: transitionDescription,
    };
    client.post('/transition/create', body).then((response) => {
      console.log(response);
      if (response.status === 201) {
        setDataLoading(!dataLoading);
        setTransitionDescription('');
      }
    });
  };

  const deleteTransition = (id) => {
    client.delete(`/transition/${shop._id}/delete/${id}`).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setDataLoading(!dataLoading);
      }
    });
  };

  const editTransitionInput = (e) => {
    console.log(e.target.innerText);
    setEditTransition(e.target.innerText);
  };

  const editTransition = (e) => {
    let body = {
      locationId: shop._id,
      transitionId: e.target.id,
      description: editTransitionDes,
    };

    console.log(body);

    client.patch('/transition/desc/update', body).then((response) => {
      console.log(response.data);
    });
  };

  const toggleTransition = (id) => {
    console.log(id);

    let body = {
      locationId: shop._id,
      transitionId: id,
    };

    client.patch(`/transition/toggle`, body).then((response) => {
      console.log(response);
      if (response.status === 201) {
        setDataLoading(!dataLoading);
      }
    });
  };
  return (
    <div id="TransitionList">
      <div className="current-date">
        <h4>
          {year}년 {month}월 {day}일
        </h4>
      </div>
      <div className="transition-input">
        <input
          type="text"
          value={transitionDescription}
          onChange={transitionDesOnChange}
          placeholder="전달 사항을 입력해 주세요"
        />
        <button type="button" onClick={addTransition} className="add">
          <MdAdd size="24" />
        </button>
      </div>
      <div className="transition-list">
        {!changeData && <ModalLoading />}
        <ul>
          {getTransition &&
            getTransition.map((transition, index) => (
              <li key={index}>
                <div
                  className={`tran-cont ${
                    transition.completed ? 'completed' : ''
                  }`}
                >
                  <button
                    className="tran-check"
                    onClick={() => toggleTransition(transition._id)}
                  >
                    {transition.completed ? (
                      <MdCheckBox size="22" className="check-box" />
                    ) : (
                      <MdCheckBoxOutlineBlank size="22" />
                    )}
                  </button>
                  <div
                    onInput={editTransitionInput}
                    contenteditable="true"
                    className="title"
                    onBlur={editTransition}
                    id={transition._id}
                  >
                    {transition.description}
                  </div>

                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => deleteTransition(transition._id)}
                    name="삭제"
                  >
                    <MdDelete size="30" />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TransitionList;
