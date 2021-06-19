import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import 'components/workManual/ManualUpload/ManualUpload.scss';
import axios from 'axios';
import { APIURL } from 'config';
import { useSelector } from 'react-redux';
import client from 'utils/api';
import useConfirm from 'hooks/useConfirm';

const ManualEdit = ({ editState, ToggleButton }) => {
  const user = useSelector((state) => state.user);
  const shop = useSelector((state) => state.shop);
  const workManual = useSelector((state) => state.workManual);
  const [categoryDefault, setCategoryDefault] = useState(
    workManual.category_id.name,
  );
  const [categories, setCategories] = useState([]);
  const [manualContent, setManualContent] = useState({
    title: workManual.title,
    content: workManual.content,
    category: workManual.category_id._id,
  });

  const { title, content, category } = manualContent;

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`${APIURL}/category/${shop._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(result.data);
      setCategories(result.data);
    }
    fetchData();
  }, []);

  // Form 입력 값 onChange 함수
  const formOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    const nextForm = {
      ...manualContent,
      [e.target.name]: e.target.value,
    };
    setManualContent(nextForm);
  };

  // 매뉴얼 삭제 함수
  const manualDelete = () => {
    client
      .delete(`/location/${shop._id}/workmanual/${workManual._id}/delete`)
      .then((response) => {
        if (response.data.deletedWorkManual._id) {
          window.location.replace(`/${shop._id}/workmanual`);
        }
      });
  };

  const cancelConfirm = () => console.log('취소하였습니다');
  const confirmDelete = useConfirm(
    '정말 삭제하시겠습니까?',
    manualDelete,
    cancelConfirm,
  );

  // 업무매뉴얼 submit 함수
  const manualOnSubmit = (e) => {
    e.preventDefault();

    let body = {
      title,
      content,
      category,
    };

    console.log(body);
    axios
      .patch(
        `${APIURL}/location/${shop._id}/workmanual/${workManual._id}/update`,
        body,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          window.location.replace(`/${shop._id}/workmanual`); // 페이지 이동 후 새로고침
        }
      });
  };

  return editState ? (
    <div id="ManualUpload" onClick={ToggleButton}>
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        {/* e.stopPropagation는 상위 이벤트에 이벤트값을 전달하는걸 막음*/}
        <form action="" onSubmit={manualOnSubmit}>
          <div className="form-category">
            <select
              name="category"
              value={category}
              onChange={formOnChange}
              style={{ width: '96%' }}
            >
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
              등록
            </button>
            <button onClick={confirmDelete} className="btn" type="button">
              삭제
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default ManualEdit;
