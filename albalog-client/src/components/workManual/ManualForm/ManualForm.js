import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import React from 'react';
import './ManualForm.scss';
import { useDispatch } from 'react-redux';
import { WorkManualForm } from 'modules/workManual';
import useCategoryEffect from 'hooks/workManual/useCategoryEffect';
import useManualForm from 'hooks/workManual/useManualForm';

const ManualForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { categories } = useCategoryEffect();
  const { workManual, title, content, onChange } = useManualForm();
  return (
    <>
      <div id="ManualForm" className="page-layout">
        <div className="upload-form">
          <form action="">
            <div className="form-item">
              <select
                name="category_id"
                // value={category_id._id}
                onChange={onChange}
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
                onChange={onChange}
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
