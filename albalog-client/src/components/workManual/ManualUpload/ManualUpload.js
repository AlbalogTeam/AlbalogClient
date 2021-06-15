import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import './ManualUpload.scss';
import axios from 'axios';
import { APIURL } from 'config';
import { useSelector } from 'react-redux';
import Loading from 'components/Loading/Loading';

const ManualUpload = ({ uploadState, ToggleButton }) => {
  const user = useSelector((state) => state.user);
  const shop = useSelector((state) => state.shop);

  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [manualContent, setManualContent] = useState({
    title: '',
    content: '',
    category: '',
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
    const nextForm = {
      ...manualContent,
      [e.target.name]: e.target.value,
    };
    setManualContent(nextForm);
  };

  // 카테고리 추가 input onChange 함수
  const categoryNameOnchange = (e) => {
    setCategoryName(e.target.value);
  };

  // 카테고리 추가 onClick 함수
  const AddCategoryHandle = () => {
    let body = {
      name: categoryName,
    };
    axios
      .post(`${APIURL}/category/${shop._id}/create`, body, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  };

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
      .post(`${APIURL}/location/${shop._id}/workmanual/create`, body, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          window.location.replace(`/${shop._id}/workmanual`); // 페이지 이동 후 새로고침
        }
      });
  };

  return uploadState ? (
    <div id="ManualUpload" onClick={ToggleButton}>
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        {/* e.stopPropagation는 상위 이벤트에 이벤트값을 전달하는걸 막음*/}
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

            <input
              type="text"
              value={categoryName}
              placeholder="카테고리 추가"
              onChange={categoryNameOnchange}
            />
            <button type="button" onClick={AddCategoryHandle}>
              추가
            </button>
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
