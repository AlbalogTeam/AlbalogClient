import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import client from 'utils/api';
import './CategorySetting.scss';
import { AiOutlineClose } from 'react-icons/ai';
import ModalLoading from 'components/Loading/ModalLoading';
import { reRender } from 'modules/render';
import MessageModal from 'components/Modal/MessageModal';
import { setWorkManual } from 'modules/workManual';

const CategorySetting = ({ categorySetState, CategorySetToggle }) => {
  const shop = useSelector((state) => state.shop);
  const render = useSelector((state) => state.render);
  const workManual = useSelector((state) => state.workManual);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [messageModalState, setMessageModalState] = useState(false);
  const [addCategoryName, setAddCategoryName] = useState('');
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [editCategory, setEditCategory] = useState('');
  useEffect(() => {
    async function fetchData() {
      const response = await client.get(`/category/${shop._id}`);
      setCategories([...response.data].reverse());

      console.log(response.data);
    }
    fetchData();
  }, [loadingCategory]);

  const categoryNameOnChange = (e) => {
    setAddCategoryName(e.target.value);
  };

  // 카테고리 추가 onClick 함수
  const AddCategoryHandle = () => {
    let body = {
      name: addCategoryName,
    };

    client
      .post(`/category/${shop._id}/create`, body)
      .then((response) => {
        console.log(response.data);
        if (response.data.newCategory._id) {
          alert('카테고리가 추가 되었습니다');
          setLoadingCategory(!loadingCategory);
          setAddCategoryName('');
          dispatch(reRender(!render.render));
        }
      })
      .catch(function (error) {
        if (error) {
          alert('중복된 카테고리가 있는지 다시 확인해 주세요.');
        }
      });
  };

  // 해당 카테고리에 업무 매뉴얼 개수 찾기
  const findCategoryManuals = async (id) => {
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
    console.log(categoryManualList);
  };

  // 카테고리 삭제

  const DeleteCategoryHandle = () => {
    const id = workManual._id;
    client
      .delete(`/category/${shop._id}/delete/${id}`)
      .then((response) => {
        console.log(response);
        if (response.data.deletedCategory) {
          alert('카테고리가 삭제되었습니다');
          setLoadingCategory(!loadingCategory);
          dispatch(reRender(!render.render));
          messageModalToggle();
        }
      })
      .catch(function (error) {
        if (error) {
          alert('해당 카테고리에 업무매뉴얼이 존재합니다.');
        }
      });
  };

  const messageModalToggle = () => {
    setMessageModalState(!messageModalState);
  };

  // 카테고리 수정

  const EditCategoryInput = (e) => {
    console.log(e.target.innerText);
    setEditCategory(e.target.innerText);
  };

  const EditCategoryHandle = (id) => {
    let body = {
      categoryId: id,
      locationId: shop._id,
      name: editCategory,
    };

    client.patch(`/category/update`, body).then((response) => {
      console.log(response);
      if (response.data.UpdatedCategory) {
        alert('카테고리가 수정되었습니다.');
        setLoadingCategory(!loadingCategory);
        dispatch(reRender(!render.render));
      }
    });
  };

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
