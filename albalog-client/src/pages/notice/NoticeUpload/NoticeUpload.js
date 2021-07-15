import React, { useCallback, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import './NoticeUpload.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from 'components/Header';
import Aside from 'components/Aside';
import Footer from 'components/Footer';
import { createNotice } from 'utils/api/notice';
import { doubleSubmitCheck } from 'utils/doubleSubmitCheck';

const NoticeUpload = ({ shop }) => {
  const [noticeContent, setNoticeContent] = useState({
    title: '',
    content: '',
  });

  const { title, content } = noticeContent;

  const onChangeTitle = useCallback(
    (e) => {
      const nextForm = {
        ...noticeContent,
        title: e.target.value,
      };
      setNoticeContent(nextForm);
    },
    [noticeContent],
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (doubleSubmitCheck()) return;
      try {
        await createNotice(title, content, shop._id);
        window.location.replace(`/${shop._id}/notice`);
      } catch (e) {
        alert('공지등록에 실패하였습니다.');
      }
    },
    [content, title, shop._id],
  );

  return (
    <>
      <Header />
      <Aside />
      <div id="NoticeUpload" className="page-layout">
        <div className="upload-form">
          <form action="" onSubmit={onSubmit}>
            <input
              type="text"
              value={title}
              onChange={onChangeTitle}
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
