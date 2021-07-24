import ModalLoading from 'components/Loading/ModalLoading';
import NoDataType1 from 'components/NoData/NoDataType1';
import { setWorkManual } from 'modules/workManual';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { connect, useDispatch, useSelector } from 'react-redux';
import { deleteManual, getWorkManuals } from 'utils/api/workmanual';
import ManualIMG from 'static/WorkManual.png';
import { useHistory } from 'react-router-dom';
import MessageModal from 'components/Modal/MessageModal';

const ManualList = ({ category, user, shop }) => {
  const [manualList, setManualList] = useState([]);
  const manual = useSelector((state) => state.workManual);
  const [deleteState, setDeleteState] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const ToggleButton = useCallback(() => {
    setDeleteState(!deleteState);
  }, [deleteState]);

  // 매뉴얼 수정 함수
  const EditHandle = useCallback(
    (manual) => {
      let manualBody = {
        _id: manual._id,
        category_id: manual.category_id,
        title: manual.title,
        content: manual.content,
      };

      dispatch(setWorkManual(manualBody));
      history.push(`/${shop._id}/workmanual/edit/${manual._id}`);
    },
    [dispatch, history, shop._id],
  );
  const DeleteHandle = (manual) => {
    dispatch(
      setWorkManual({
        _id: manual._id,
      }),
    );
    ToggleButton();
  };

  // 매뉴얼 삭제 함수
  const onDelete = useCallback(async () => {
    console.log(manual._id);
    try {
      await deleteManual(shop._id, manual._id);
      window.location.replace(`/${shop._id}/workmanual/list`);
    } catch (e) {
      alert('매뉴얼 삭제에 실패하였습니다.');
    }
  }, [shop._id, manual._id]);

  useEffect(() => {
    const getData = async () => {
      setLoadingState(false);
      const workmanuals = await getWorkManuals(shop._id);
      if (category === 'all') {
        setManualList(workmanuals);
      } else {
        setManualList(
          workmanuals.filter((manual) => manual.category_id.name === category),
        );
      }
      setLoadingState(true);
    };
    if (shop.name) {
      getData();
    }
  }, [shop, category]);

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

function mapStateToProps(state) {
  return { shop: state.shop, user: state.user };
}

export default connect(mapStateToProps)(ManualList);
