import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '../NoticeUpload/NoticeUpload.scss';
import axios from 'axios';
import Header from 'components/Header/Header';
import { APIURL } from 'config';
import { connect } from 'react-redux';
import AdminAside from '../../../components/Aside/Aside';
import Loading from 'components/Loading/Loading';
import { withRouter } from 'react-router';
import Footer from 'components/Footer/Footer';

const NoticeEdit = ({ match, shop, user }) => {
  const noticeId = match.params.id;

  const [noticeContent, setNoticeContent] = useState({
    title: '',
    content: '',
  });

  const { title, content } = noticeContent;

  const [dataState, setDataState] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `${APIURL}/location/${shop._id}/notice/${noticeId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      console.log('공지사항 수정' + result.data);
      setNoticeContent({
        ...noticeContent,
        title: result.data.notice[0].title,
        content: result.data.notice[0].content,
      });
      setDataState(1);
    }

    fetchData();
  }, [shop]);

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
    axios
      .patch(`${APIURL}/location/${shop._id}/notice/${noticeId}/update`, body, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.updatedNotice) {
          window.location.replace(`/${shop._id}/notice/${noticeId}`); // 페이지 이동 후 새로고침
        }
      });
  };

  return (
    <>
      <Header />
      <AdminAside />
      <div id="NoticeEdit">
        {dataState === 0 ? (
          <Loading />
        ) : (
          <div className="upload-form">
            <form action="" onSubmit={noticeOnSubmit}>
              <input
                type="text"
                value={title}
                autoComplete="off"
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
      <Footer />
    </>
  );
};

function mapStateToProps(state) {
  return { shop: state.shop, user: state.user };
}

export default withRouter(connect(mapStateToProps)(NoticeEdit));
