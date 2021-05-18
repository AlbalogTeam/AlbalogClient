import AdminHeader from 'components/admin/AdminHeader/AdminHeader';
import Notice from 'pages/notice/Notice';
import NoticeDetail from 'pages/noticeDetail/NoticeDetail';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div id="container">
      <AdminHeader />
      <div id="main">
        <Switch>
          <Route path="/notice" exact component={Notice} />
          <Route path="/notice/:id?" exact component={NoticeDetail} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
