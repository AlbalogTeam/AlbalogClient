import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import 'components/workManual/ManualUpload/ManualUpload.scss';
import { useSelector } from 'react-redux';
import useConfirm from 'hooks/common/useConfirm';
import { getCategories } from 'utils/api/category';
import { useCallback } from 'react';
import { deleteManual, updateManual } from 'utils/api/workmanual';

const ManualEdit = ({ editState, ToggleButton }) => {
  const shop = useSelector((state) => state.shop);
  const workManual = useSelector((state) => state.workManual);

  const [categories, setCategories] = useState([]);
  const [manualContent, setManualContent] = useState({
    title: workManual.title,
    content: workManual.content,
    category: workManual.category_id._id,
  });

  const { title, content, category } = manualContent;

  useEffect(() => {
    const getData = async () => {
      const result = await getCategories(shop._id);
      setCategories([...result].reverse());
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

  // 매뉴얼 삭제 함수
  const manualDelete = useCallback(async () => {
    try {
      await deleteManual(shop._id, workManual._id);
      window.location.replace(`/${shop._id}/workmanual`);
    } catch (e) {
      alert('매뉴얼 삭제에 실패하였습니다.');
    }
  }, [shop._id, workManual._id]);

  const cancelConfirm = () => console.log('취소하였습니다');
  const confirmDelete = useConfirm(
    '정말 삭제하시겠습니까?',
    manualDelete,
    cancelConfirm,
  );

  // 업무매뉴얼 submit 함수
  const manualOnSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await updateManual(shop._id, workManual._id, title, content, category);
        window.location.replace(`/${shop._id}/workmanual`);
      } catch (e) {
        alert('매뉴얼 수정에 실패했습니다');
      }
    },
    [category, content, title, shop._id, workManual._id],
  );

  return editState ? (
    <div id="ManualUpload">
      <div className="upload-modal">
        <form action="" onSubmit={manualOnSubmit}>
          <div className="form-category">
            <select name="category" value={category} onChange={formOnChange}>
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
                console.log('Editor is ready to use!', editor);
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
                // console.log({ event, editor, data });
                const nextForm = {
                  ...manualContent,
                  content: data,
                };
                setManualContent(nextForm);
              }}
              editor={DecoupledEditor}
              data={content}
            />
          </div>
          <div className="update-btn">
            <button className="btn" type="submit">
              수정완료
            </button>
            <button
              onClick={confirmDelete}
              className="btn delete"
              type="button"
            >
              삭제
            </button>
            <button onClick={ToggleButton} className="btn" type="button">
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default ManualEdit;
