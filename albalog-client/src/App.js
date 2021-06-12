import AdminDashboardPage from 'pages/admin/AdminDashboardPage';
import AdminEmployeePage from 'pages/admin/AdminEmployeePage';
import AdminInfoPage from 'pages/admin/AdminInfoPage';
import AdminPayrollPage from 'pages/admin/AdminPayrollPage';
import NoticeList from 'pages/notice/NoticeList/NoticeList';
import NoticeDetail from 'pages/notice/NoticeDetail/NoticeDetail';
import { Route, Switch } from 'react-router-dom';
import NoticeUpload from 'pages/notice/NoticeUpload/NoticeUpload';
import NoticeEdit from 'pages/notice/NoticeEdit/NoticeEdit';
import WorkManual from 'pages/workManual/WorkManual';
import Transition from 'pages/transition/Transition';
import Landing from 'pages/landing/Landing';
import PartTimeDashboard from 'pages/partTime/PartTimeDashboard';
import Login from 'pages/login/Login';
import SignUp from 'pages/signUp/SignUp';
import AccountInfo from 'pages/partTime/AccountInfo';
import WorkingTime from 'pages/partTime/WorkingTime';
import React from 'react';
import ParttimeScheduler from 'pages/partTime/schedule/ParttimeScheduler';
import Authentication from 'utils/authentication';

const App = () => {
  return (
    <div id="container">
      <div id="main">
        <Switch>
          <Route path="/" exact component={Authentication(Landing, true)} />
          <Route path="/login" component={Authentication(Login, false)} exact />
          <Route
            path="/signup"
            component={Authentication(SignUp, false)}
            exact
          />
          <Route
            path="/:shop?/notice"
            exact
            component={Authentication(NoticeList, true)}
          />
          <Route
            path="/:shop?/notice/edit/:id?"
            component={Authentication(NoticeEdit, true, true)}
          />
          <Route
            path="/:shop?/notice/upload"
            component={Authentication(NoticeUpload, true, true)}
          />
          <Route
            path="/:shop?/notice/:id?"
            component={Authentication(NoticeDetail, true)}
          />
          <Route
            path="/:shop?/workmanual/:category?"
            component={Authentication(WorkManual, true)}
          />
          <Route
            path="/:shop?/transition"
            exact
            component={Authentication(Transition, true)}
          />
          <Route
            path="/admin/:shop?"
            exact
            component={Authentication(AdminDashboardPage, true, true)}
          />
          <Route
            path="/admin/:shop?/info"
            component={Authentication(AdminInfoPage, true, true)}
          />
          <Route
            path="/admin/:shop?/payroll"
            component={Authentication(AdminPayrollPage, true, true)}
          />
          <Route
            path="/admin/:shop?/employeelist"
            component={Authentication(AdminEmployeePage, true, true)}
          />

          {/** 나중에 staff로 바꿔야함 */}
          <Route
            path="/parttime/:shop?"
            exact
            component={Authentication(PartTimeDashboard, true)}
          />
          <Route
            path="/parttime/:shop?/accountinfo"
            exact
            component={Authentication(AccountInfo, true)}
          />
          <Route
            path="/parttime/:shop?/scheduler"
            exact
            component={Authentication(ParttimeScheduler, true)}
          />
          <Route
            path="/parttime/:shop?/workingtime"
            exact
            component={Authentication(WorkingTime, true)}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
