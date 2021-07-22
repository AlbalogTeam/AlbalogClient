import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import './ManualUpload.scss';
import { useSelector } from 'react-redux';
import { getCategories } from 'utils/api/category';
import { createManual } from 'utils/api/workmanual';
import { useCallback } from 'react';
import { doubleSubmitCheck } from 'utils/doubleSubmitCheck';

const ManualUpload = ({ uploadState, ToggleButton }) => {
  const shop = useSelector((state) => state.shop);
  const [categories, setCategories] = useState([]);
  const [manualContent, setManualContent] = useState({
    title: '',
    content: '',
    category: '',
  });

  const { title, content, category } = manualContent;

  useEffect(() => {
    const getData = async () => {
      const categories = await getCategories(shop._id);
      setCategories(categories);
    };
    getData();
  }, [shop._id]);

  // Form 입력 값 onChange 함수
  const formOnChange = useCallback(
    (e) => {
      const nextForm = {
        ...manualContent,
        [e.target.name]: e.target.value,
      };
      setManualContent(nextForm);
    },
    [manualContent],
  );

  // 업무매뉴얼 submit 함수
  const manualOnSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // if (doubleSubmitCheck()) return;
      console.log('dd');
      try {
        await createManual(shop._id, title, content, category);
        window.location.replace(`/${shop._id}/workmanual`);
      } catch (e) {
        alert('매뉴얼 등록에 실패하였습니다.');
      }
    },
    [category, content, shop._id, title],
  );

  return uploadState ? (
    <div id="ManualUpload">
      <div className="upload-modal">
        <form action="" onSubmit={manualOnSubmit}>
          <div className="form-category">
            <select name="category" value={category} onChange={formOnChange}>
              <option value="">카테고리 선택</option>
              {categories.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            className="form-title"
            placeholder="제목을 입력해주세요"
            name="title"
            value={title}
            autoComplete="off"
            onChange={formOnChange}
          />

          <div className="modal-size">
            <CKEditor
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
                const nextForm = {
                  ...manualContent,
                  content: data,
                };
                setManualContent(nextForm);
              }}
              editor={DecoupledEditor}
              data=""
            />
          </div>
          <div className="update-btn">
            <button className="btn" type="submit">
              등록
            </button>
            <button className="btn" onClick={ToggleButton} type="button">
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default React.memo(ManualUpload);
