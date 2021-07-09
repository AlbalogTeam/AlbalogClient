import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import './NoticeUpload.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from 'components/Header/Header';
import Aside from 'components/Aside/Aside';
import Footer from 'components/Footer/Footer';
import client from 'utils/api';

const NoticeUpload = ({ shop }) => {
  const [noticeContent, setNoticeContent] = useState({
    title: '',
    content: '',
  });

  const { title, content } = noticeContent;

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
      content,
    };

    client
      .post(`/location/${shop._id}/notice/create`, body)
      .then((response) => {
        if (response.status === 201) {
          window.location.replace(`/${shop._id}/notice`); // 페이지 이동 후 새로고침
        }
      });
  };

  return (
    <>
      <Header />
      <Aside />
      <div id="NoticeUpload" className="page-layout">
        <div className="upload-form">
          <form action="" onSubmit={noticeOnSubmit}>
            <input
              type="text"
              value={title}
              onChange={titleOnChange}
              placeholder="제목을 입력하세요"
              autoComplete="off"
            />
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
                  // console.log({ event, editor, data });
                  const nextForm = {
                    ...noticeContent,
                    content: data,
                  };
                  setNoticeContent(nextForm);
                }}
                editor={DecoupledEditor}
                data=""
              />
            </div>

            <button type="submit">등록하기</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

function mapStateToProps(state) {
  return { shop: state.shop, user: state.user };
}

export default withRouter(connect(mapStateToProps)(NoticeUpload));
