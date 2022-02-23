import React, { useCallback, useEffect, useState } from 'react';
import './CategoryManage.scss';
import { MdEdit } from 'react-icons/md';
import { HiMinusCircle } from 'react-icons/hi';
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from 'utils/api/category';
import { useDispatch, useSelector } from 'react-redux';
import { resetManual, setWorkManual } from 'modules/workManual';
import MessageModal from 'components/Modal/MessageModal';

const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shop);
  const workManual = useSelector((state) => state.workManual);

  useEffect(() => {
    async function fetchData() {
      const categories = await getCategories(shop._id);
      setCategories(categories);
    }
    fetchData();
  }, [shop._id]);

  const [createCategoryInput, setCreateCategoryInput] = useState('');

  // 카테고리 추가 인풋 상태 관리 함수
  const onChangeForCreateCategory = useCallback((e) => {
    setCreateCategoryInput(e.target.value);
  }, []);

  // 카테고리 추가 onClick 함수
  const onCreate = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        console.log(createCategoryInput);
        const result = await addCategory(shop._id, createCategoryInput);
        setCategories(result);
        setCreateCategoryInput('');
      } catch (e) {
        alert('중복된 카테고리가 있는지 다시 확인해 주세요.');
      }
    },
    [createCategoryInput, shop._id],
  );

  const [messageModalState, setMessageModalState] = useState(false);

  // 모달창 토글 함수
  const messageModalToggle = useCallback(() => {
    setMessageModalState(!messageModalState);
  }, [messageModalState]);

  // 해당 카테고리에 업무 매뉴얼 개수 찾기
  const findCategoryManuals = useCallback(
    async (id) => {
      messageModalToggle();
      let categoryManualList = await shop.workManuals.filter(
        (manual) => manual.category_id._id === id,
      );
      const title =
        categoryManualList.length === 0
          ? '정말 삭제하시겠습니까?'
          : `매뉴얼이 ${categoryManualList.length}개 존재합니다. 그래도 삭제하시겠습니까?
        `;

      const content =
        categoryManualList.length === 0
          ? ''
          : `※ 매뉴얼은 전부 삭제 됩니다 ※
    `;

      let body = {
        _id: id,
        title,
        content,
      };
      dispatch(setWorkManual(body));
    },
    [dispatch, messageModalToggle, shop.workManuals],
  );

  // 카테고리 삭제
  const onDelete = useCallback(async () => {
    try {
      const result = await deleteCategory(shop._id, workManual._id);
      setCategories(result);
      messageModalToggle();
      dispatch(resetManual());
    } catch (e) {
      alert('카테고리 삭제에 실패했습니다.');
    }
  }, [messageModalToggle, shop._id, workManual._id, dispatch]);

  const [updateCategoryId, setUpdateCategoryId] = useState('');
  const [updateCategoryInput, setUpdateCategoryInput] = useState('');

  // 카테고리 수정 활성화
  const onUpdateActive = (categoryId, name) => {
    setUpdateCategoryId(categoryId);
    setUpdateCategoryInput(name);
  };

  // 카테고리 수정 input
  const onChangeForUpdate = (e) => {
    setUpdateCategoryInput(e.target.value);
  };

  // 카테고리 수정 취소
  const onUpdateCancel = () => {
    setUpdateCategoryId('');
  };

  // 카테고리 수정
  const onUpdate = async (categoryId) => {
    try {
      const result = await updateCategory(
        shop._id,
        categoryId,
        updateCategoryInput,
      );
      setCategories(result);
      setUpdateCategoryId('');
    } catch (e) {
      console.log(e);
      alert('카테고리 수정에 실패했습니다');
    }
  };
  return (
    <>
      <div id="CategoryManage" className="side-layout manage-layout">
        <div className="inner-manage">
          <div className="manage-tit">
            <span>Category</span>
            <form onSubmit={onCreate}>
              <input
                type="text"
                name="addCategoryInput"
                value={createCategoryInput}
                onChange={onChangeForCreateCategory}
                placeholder="카테고리 입력"
              />
              <button type="submit">카테고리 등록</button>
            </form>
          </div>
          <div className="category-list-table">
            <div className="category-list">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '10%' }}>번호</th>
                    <th style={{ width: '45%' }}>이름</th>
                    <th style={{ width: '10%' }}>수정</th>
                    <th style={{ width: '10%' }}>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>

                      {updateCategoryId === category._id ? (
                        <td className="category-edit">
                          <input
                            value={updateCategoryInput}
                            onChange={onChangeForUpdate}
                            type="text"
                          />
                          <button
                            type="button"
                            className="btn-type1"
                            onClick={() => onUpdate(category._id)}
                          >
                            저장
                          </button>
                          <button
                            type="button"
                            className="btn-type2"
                            onClick={onUpdateCancel}
                          >
                            취소
                          </button>
                        </td>
                      ) : (
                        <td className="name">{category.name}</td>
                      )}

                      <td className="ico">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateActive(category._id, category.name)
                          }
                        >
                          <MdEdit size="26" />
                        </button>
                      </td>
                      <td className="ico">
                        <button
                          type="button"
                          onClick={() => findCategoryManuals(category._id)}
                        >
                          <HiMinusCircle size="26" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {messageModalState && (
                <MessageModal
                  messageModalToggle={messageModalToggle}
                  deleteCont={onDelete}
                  message={workManual.title}
                  alert={workManual.content}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryManage;
