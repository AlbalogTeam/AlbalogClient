import ModalLoading from 'components/Loading/ModalLoading';
import NoDataType1 from 'components/NoData/NoDataType1';
import { setWorkManual } from 'modules/workManual';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getWorkManuals } from 'utils/api/workmanual';
import ManualEdit from '../ManualEdit/ManualEdit';

const ManualList = ({ category, user, shop }) => {
  const [manualList, setManualList] = useState([]);
  const [editState, setEditState] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const render = useSelector((state) => state.render);
  const dispatch = useDispatch();

  const ToggleButton = useCallback(() => {
    setEditState(!editState);
  }, [editState]);

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
      ToggleButton();
    },
    [ToggleButton, dispatch],
  );

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
  }, [shop, category, render]);

  return (
    <div className="manual-list">
      {!manualList.length && shop._id && loadingState && (
        <NoDataType1 text={'등록된 업무 매뉴얼이 없습니다.'} />
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

      {editState && (
        <ManualEdit editState={editState} ToggleButton={ToggleButton} />
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return { shop: state.shop, user: state.user };
}

export default connect(mapStateToProps)(ManualList);
