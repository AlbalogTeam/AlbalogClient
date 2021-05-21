import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import './MenualUpload.scss';

const MenualUpload = ({ uploadState, ToggleButton }) => {
  return uploadState ? (
    <div id="MenualUpload" onClick={ToggleButton}>
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        {/* e.stopPropagation는 상위 이벤트에 이벤트값을 전달하는걸 막음*/}
        <form action="">
          <input type="text" placeholder="제목을 입력해주세요" />
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

export default MenualUpload;
