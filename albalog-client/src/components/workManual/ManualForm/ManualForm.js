import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import React, { useCallback, useEffect, useState } from 'react';
import './ManualForm.scss';
import { getCategories } from 'utils/api/category';
import { useDispatch, useSelector } from 'react-redux';
import { WorkManualForm } from 'modules/workManual';

const ManualForm = ({ onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const shop = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const workManual = useSelector((state) => state.workManual);
  const { title, content, category_id } = workManual;

  // Form 입력 값 onChange 함수
  const formOnChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      let body = {
        key: name,
        value,
      };
      dispatch(WorkManualForm(body));
    },
    [dispatch],
  );

  useEffect(() => {
    const getData = async () => {
      const categories = await getCategories(shop._id);
      setCategories(categories);
    };
    getData();
  }, [shop._id]);
  return (
    <>
      <div id="ManualForm" className="page-layout">
        <div className="upload-form">
          <form action="">
            <div className="form-item">
              
              <select
                name="category_id"
                // value={category_id._id}
                onChange={formOnChange}
              >
                {!workManual.category_id && (
                  <option value="">카테고리를 선택해주세요</option>
                )}

                {categories.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-item">
              <input
                type="text"
                value={title}
                onChange={formOnChange}
                name="title"
                placeholder="제목을 입력하세요"
                autoComplete="off"
              />
            </div>
            <div className="write-cont">
              <CKEditor
                config={{ placeholder: '내용을 입력해주세요 ... ' }}
                onReady={(editor) => {
                  editor.ui
                    .getEditableElement()
                    .parentElement.insertBefore(
                      editor.ui.view.toolbar.element,
                      editor.ui.getEditableElement(),
                    );
                }}
                onError={({ willEditorRestart }) => {
                  if (willEditorRestart) {
                    this.editor.ui.view.toolbar.element.remove();
                  }
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  let body = {
                    key: 'content',
                    value: data,
                  };
                  dispatch(WorkManualForm(body));
                }}
                editor={DecoupledEditor}
                data={content}
              />
            </div>

            <button onClick={onSubmit} className="btn-type1" type="submit">
              등록하기
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManualForm;
