import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '../NoticeUpload/NoticeUpload.scss';
import axios from 'axios';
import ParttimeHeader from 'components/partTime/header/ParttimeHeader';
import ParttimeAside from 'components/partTime/aside/ParttimeAside';

const NoticeEdit = ({ match }) => {
  const noticeId = Number(match.params.id);

  const [noticeContent, setNoticeContent] = useState({
    title: '',
    content: '',
  });

  const { title, content } = noticeContent;

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${noticeId}`)
      .then((response) => {
        console.log(response.data);
        setNoticeContent({
          ...noticeContent,
          title: response.data.title,
          content: response.data.body,
        });
      });
  }, []);

  const titleOnChange = (e) => {
    const nextForm = {
      ...noticeContent,
      title: e.target.value,
    };
    setNoticeContent(nextForm);
  };

  const noticeOnSubmit = (e) => {
    e.preventDefault();

    let body = {
      title,
      body: content,
    };
    axios
      .post('https://jsonplaceholder.typicode.com/posts', body)
      .then((response) => {
        console.log('백앤드에 전송된 데이터');
        console.log(`title : ${response.data.title}`);
        console.log(`content: ${response.data.body}`);
      });
  };

  return (
    <>
      <ParttimeHeader />
      <ParttimeAside />
      <div id="NoticeEdit">
        {title && content /** title과 content가 불러와진 후에 랜더링  */ && (
          <div className="upload-form">
            <form action="" onSubmit={noticeOnSubmit}>
              <input
                type="text"
                value={title}
                onChange={titleOnChange}
                placeholder="제목을 입력하세요"
              />
              <div className="write-cont">
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
                      ...noticeContent,
                      content: data,
                    };
                    setNoticeContent(nextForm);
                  }}
                  editor={DecoupledEditor}
                  data={content}
                />
              </div>

              <button type="submit">수정완료</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default NoticeEdit;
