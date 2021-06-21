import NoDataType1 from 'components/NoData/NoDataType1';
import { setWorkManual } from 'modules/workManual';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { connect, useDispatch, useSelector } from 'react-redux';
import ManualEdit from '../ManualEdit/ManualEdit';

const ManualList = ({ category, user, shop }) => {
  const workManual = useSelector((state) => state.workManual);
  const [manualList, setManualList] = useState([]);
  const [editState, setEditState] = useState(false);
  const dispatch = useDispatch();

  const ToggleButton = () => {
    setEditState(!editState);
  };

  // 매뉴얼 수정 함수
  const EditHandle = (manual) => {
    let manualBody = {
      _id: manual._id,
      category_id: manual.category_id,
      title: manual.title,
      content: manual.content,
    };

    dispatch(setWorkManual(manualBody));
    ToggleButton();
  };

  console.log(`category: ${category}`);
  useEffect(() => {
    if (category === 'all') {
      setManualList(shop.workManuals);
    } else {
      const filterHandle = async () => {
        const WorkManualList = await shop.workManuals.filter(
          (manual) => manual.category_id.name === category,
        );

        setManualList(WorkManualList);
      };

      filterHandle();
    }

    console.log(manualList);
  }, [shop, category]);

  return (
    <div className="manual-list">
      {!manualList.length && (
        <NoDataType1 text={'등록된 업무 매뉴얼이 없습니다.'} />
      )}

      {manualList && (
        <ul>
          {manualList.map((manual, index) => {
            console.log(manual);
            return (
              <li key={index}>
                <div className="manual-title">
                  {manual.title}
                  {user.role === 'owner' && (
                    <div className="ico">
                      <button
                        onClick={() => EditHandle(manual)}
                        className="btn"
                      >
                        <AiOutlineEdit size="22" />
                      </button>
                    </div>
                  )}
                </div>
                <br />
                <div dangerouslySetInnerHTML={{ __html: manual.content }}></div>
              </li>
            );
          })}
        </ul>
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
