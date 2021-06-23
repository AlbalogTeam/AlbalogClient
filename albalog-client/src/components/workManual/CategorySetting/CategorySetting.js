import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import client from 'utils/api';
import './CategorySetting.scss';
import { AiOutlineClose } from 'react-icons/ai';
import ModalLoading from 'components/Loading/ModalLoading';
import { reRender } from 'modules/render';

const CategorySetting = ({ categorySetState, CategorySetToggle }) => {
  const shop = useSelector((state) => state.shop);
  const render = useSelector((state) => state.render);
  console.log(render);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
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

    client.post(`/category/${shop._id}/create`, body).then((response) => {
      console.log(response.data);
      if (response.data.newCategory._id) {
        alert('카테고리가 추가 되었습니다');
        setLoadingCategory(!loadingCategory);
        setAddCategoryName('');
        dispatch(reRender(!render.render));
      }
    });
  };

  // 카테고리 삭제
  const DeleteCategoryHandle = (id) => {
    client.delete(`/category/${shop._id}/delete/${id}`).then((response) => {
      console.log(response);
      if (response.data.deletedCategory) {
        alert('카테고리가 삭제되었습니다');
        setLoadingCategory(!loadingCategory);
      }
    });
  };

  // 카테고리 수정

  const EditCategoryInput = (e) => {
    console.log(e.target.innerText);
    setEditCategory(e.target.innerText);
  };

  const EditCategoryHandle = (id) => {
    let body = {
      categoryId: id,
      name: editCategory,
    };

    client.patch(`/category/update`, body).then((response) => {
      console.log(response);
      if (response.data.UpdatedCategory) {
        alert('카테고리가 수정되었습니다.');
        setLoadingCategory(!loadingCategory);
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
                    onClick={() => DeleteCategoryHandle(category._id)}
                    className="btn"
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : null;
};

export default CategorySetting;
