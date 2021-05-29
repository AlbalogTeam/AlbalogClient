import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import './ManualUpload.scss';

const ManualUpload = ({ uploadState, ToggleButton }) => {
  return uploadState ? (
    <div id="ManualUpload" onClick={ToggleButton}>
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        {/* e.stopPropagation는 상위 이벤트에 이벤트값을 전달하는걸 막음*/}
        <form action="">
          <div className="form-category">
            <select name="manual-category">
              <option value="">카테고리 선택</option>
              <option value="">공통</option>
              <option value="">홀</option>
              <option value="">주방</option>
            </select>
            <input type="text" placeholder="카테고리 추가" />
            <button>추가</button>
          </div>

          <input type="text" className="form-title" placeholder="제목을 입력해주세요" />

          <div className="modal-size">
            <CKEditor
              onReady={(editor) => {
                console.log('Editor is ready to use!', editor);
                editor.ui
                  .getEditableElement()
                  .parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement(),
                  );

                editor = editor;
              }}
              onError={({ willEditorRestart }) => {
                if (willEditorRestart) {
                  this.editor.ui.view.toolbar.element.remove();
                }
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                // console.log({ event, editor, data });
              }}
              editor={DecoupledEditor}
              data=""
            />
          </div>
          <button type="submit">등록</button>
        </form>
      </div>
    </div>
  ) : null;
};

export default ManualUpload;
