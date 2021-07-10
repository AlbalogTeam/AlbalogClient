import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CategorySetting.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { reRender } from 'modules/render';
import MessageModal from 'components/Modal/MessageModal';
import { setWorkManual } from 'modules/workManual';
import { addCategory, deleteCategory, getCategories, updateCategory } from 'utils/api/category';
import { useCallback } from 'react';

const CategorySetting = ({ categorySetState, CategorySetToggle }) => {
  const shop = useSelector((state) => state.shop);
  const render = useSelector((state) => state.render);
  const workManual = useSelector((state) => state.workManual);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [messageModalState, setMessageModalState] = useState(false);
  const [addCategoryName, setAddCategoryName] = useState('');
  const [editCategory, setEditCategory] = useState('');

  useEffect(() => {
    async function fetchData() {
      const categories = await getCategories(shop._id);
      setCategories(categories);
    }
    fetchData();
  }, [shop._id]);

  // 카테고리 추가 인풋 상태 관리 함수
  const categoryNameOnChange = useCallback((e) => {
    setAddCategoryName(e.target.value);
  }, []);

  // 모달창 토글 함수
  const messageModalToggle = useCallback(() => {
    setMessageModalState(!messageModalState);
  }, [messageModalState]);

  // 카테고리 추가 onClick 함수
  const AddCategoryHandle = useCallback(async () => {
    try {
      const result = await addCategory(shop._id, addCategoryName);
      setCategories(result);
      setAddCategoryName('');
      dispatch(reRender(!render.render));
    } catch (e) {
      alert('중복된 카테고리가 있는지 다시 확인해 주세요.');
    }
  }, [addCategoryName, shop._id, dispatch, render.render]);

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
  const DeleteCategoryHandle = useCallback(async () => {
    try {
      const result = await deleteCategory(shop._id, workManual._id);
      setCategories(result);
      dispatch(reRender(!render.render));
      messageModalToggle();
    } catch (e) {
      alert('카테고리 삭제에 실패했습니다.');
    }
  }, [dispatch, messageModalToggle, render.render, shop._id, workManual._id]);

  // 카테고리 수정 인풋 상태관리 함수
  const EditCategoryInput = useCallback((e) => {
    setEditCategory(e.target.innerText);
  }, []);

  // 카테고리 수정
  const EditCategoryHandle = useCallback(
    async (categoryId) => {
      try {
        const result = await updateCategory(shop._id, categoryId, editCategory);
        setCategories(result);
        dispatch(reRender(!render.render));
      } catch (e) {
        console.log(e);
        alert('카테고리 수정에 실패했습니다');
      }
    },
    [dispatch, editCategory, render.render, shop._id],
  );

  return categorySetState ? (
    <div id="CategorySetting">
      <div className="setting-modal">
        <div className="modal-tit">
          <h3>카테고리 관리</h3>
          <button onClick={CategorySetToggle} className="close">
            <AiOutlineClose size="26" />
          </button>
        </div>

        <div className="category-add">
          <div className="category-add-inner">
            <input
              value={addCategoryName}
              onChange={categoryNameOnChange}
              type="text"
              placeholder="카테고리를 추가"
            />
            <button onClick={AddCategoryHandle} type="button">
              추가
            </button>
          </div>
        </div>

        <div className="category-list">
          <ul>
            {categories.map((category, index) => (
              <li key={index} className="categories">
                <div className="category-name">
                  <div
                    onInput={EditCategoryInput}
                    contenteditable="true"
                    className="name"
                  >
                    {category.name}
                  </div>
                </div>
                <div className="category-modify">
                  <button
                    onClick={() => EditCategoryHandle(category._id)}
                    className="btn"
                  >
                    수정
                  </button>
                </div>
                <div className="category-delete">
                  <button
                    onClick={() => findCategoryManuals(category._id)}
                    className="btn"
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {messageModalState && (
          <MessageModal
            messageModalToggle={messageModalToggle}
            deleteCont={DeleteCategoryHandle}
            message={workManual.title}
            alert={workManual.content}
          />
        )}
      </div>
    </div>
  ) : null;
};

export default CategorySetting;
