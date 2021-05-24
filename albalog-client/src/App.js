import AdminHeader from 'components/admin/AdminHeader/AdminHeader';
import NoticeList from 'pages/notice/NoticeList/NoticeList';
import NoticeDetail from 'pages/notice/NoticeDetail/NoticeDetail';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NoticeUpload from 'pages/notice/NoticeUpload/NoticeUpload';
import NoticeEdit from 'pages/notice/NoticeEdit/NoticeEdit';
import WorkManual from 'pages/workManual/WorkManual';
import Transition from 'pages/transition/Transition';

const App = () => {
  return (
    <div id="container">
      <AdminHeader />
      <div id="main">
        <Switch>
          <Route path="/notice" exact component={NoticeList} />
          <Route path="/notice/upload" exact component={NoticeUpload} />
          <Route path="/notice/:id?" exact component={NoticeDetail} />
          <Route path="/notice/edit/:id?" exact component={NoticeEdit} />
          <Route path="/workmanual/:category" exact component={WorkManual} />
          <Route path="/transition" exact component={Transition} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
