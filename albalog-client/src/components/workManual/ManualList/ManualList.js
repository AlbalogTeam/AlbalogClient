import ModalLoading from 'components/Loading/ModalLoading';
import NoDataType1 from 'components/NoData/NoDataType1';
import React from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import ManualIMG from 'static/WorkManual.png';
import MessageModal from 'components/Modal/MessageModal';
import useManualHandle from 'hooks/workManual/useManualHandle';

const ManualList = ({ category }) => {
  const {
    ToggleButton,
    EditHandle,
    DeleteHandle,
    onDelete,
    manualList,
    loadingState,
    deleteState,
    shop,
    user,
  } = useManualHandle(category);

  return (
    <div className="manual-list">
      {!manualList.length && shop._id && loadingState && (
        <NoDataType1 text={'등록된 업무 매뉴얼이 없습니다.'} img={ManualIMG} />
      )}
      {loadingState === true && manualList ? (
        <ul>
          {manualList.map((manual, index) => {
            return (
              <li key={index}>
                <div className="manual-title">
                  <div className="title">{manual.title}</div>
                  {user.role === 'owner' && (
                    <div className="ico">
                      <button
                        onClick={() => EditHandle(manual)}
                        className="btn"
                      >
                        <AiOutlineEdit size="24" />
                      </button>
                      <button
                        onClick={() => DeleteHandle(manual)}
                        className="btn"
                      >
                        <AiFillDelete size="24" />
                      </button>
                    </div>
                  )}
                </div>
                <br />
                <div
                  className="manual-content"
                  dangerouslySetInnerHTML={{ __html: manual.content }}
                ></div>
              </li>
            );
          })}
        </ul>
      ) : (
        <ModalLoading />
      )}
      {deleteState && (
        <MessageModal messageModalToggle={ToggleButton} deleteCont={onDelete} />
      )}
    </div>
  );
};

export default ManualList;
