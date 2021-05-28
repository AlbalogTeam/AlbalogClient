import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PartTimeDashboard from 'pages/partTime/PartTimeDashboard';
import Login from 'components/Login';
import SignUp from 'components/SignUp';
import AccountInfo from 'pages/partTime/AccountInfo';

const App = () => {
  return (
    <div id="main">
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/signup" component={SignUp} exact />
        <Route path="/parttimedashboard" component={PartTimeDashboard} exact />
        <Route path="/accountinfo" component={AccountInfo} exact />
        {/* <Route path="/notice" exact component={NoticeList} />
        <Route path="/notice/upload" exact component={NoticeUpload} />
        <Route path="/notice/:id?" exact component={NoticeDetail} />
        <Route path="/notice/edit/:id?" exact component={NoticeEdit} /> */}
        {/* <Route path="/workmenual/common" exact component={MenualPage} />
        <Route path="/workmenual/:category" exact component={MenualPage} /> */}
      </Switch>
    </div>
  );
};

export default App;
