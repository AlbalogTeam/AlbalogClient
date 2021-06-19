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
import Header from 'components/Header/Header';
import Authentication from 'utils/authentication';
import ParttimeScheduler from 'pages/partTime/schedule/ParttimeScheduler';
import EmployeeSignUp from 'pages/employeeSignUp/EmployeeSignUp';
import EmployeeLogin from 'pages/employeeLogIn/EmployeeLogin';

const App = () => {
  // Authentication(a, b, c)
  // a : 컴포넌트
  // b : true-> 로그인한 유저만 접근가능 false-> 로그인한 유저는 출입이 불가능 null -> 아무나 출입이 가능
  // c : null -> 아무나 접근가능 'admin' -> 관리자만 접근 가능 'staff' -> 직원만 접근가능
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
            component={Authentication(NoticeEdit, true, 'admin')}
          />
          <Route
            path="/:shop?/notice/upload"
            component={Authentication(NoticeUpload, true, 'admin')}
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
            component={Authentication(AdminDashboardPage, true, 'admin')}
          />
          <Route
            path="/admin/:shop?/info"
            component={Authentication(AdminInfoPage, true, 'admin')}
          />
          <Route
            path="/admin/:shop?/payroll"
            component={Authentication(AdminPayrollPage, true, 'admin')}
          />
          <Route
            path="/admin/:shop?/employeelist"
            component={Authentication(AdminEmployeePage, true, 'admin')}
          />

          {/** 나중에 staff로 바꿔야함 */}
          <Route
            path="/parttime/login"
            exact
            component={Authentication(EmployeeLogin, false)}
          />
          <Route
            path="/parttime/:shop?"
            exact
            component={Authentication(PartTimeDashboard, true, 'staff')}
          />
          <Route
            path="/parttime/:shop?/accountinfo"
            exact
            component={Authentication(AccountInfo, true, 'staff')}
          />
          <Route
            path="/parttime/:shop?/scheduler"
            exact
            component={Authentication(ParttimeScheduler, true, 'staff')}
          />
          <Route
            path="/parttime/:shop?/workingtime"
            exact
            component={Authentication(WorkingTime, true, 'staff')}
          />
          <Route
            path="/parttime/:shop/signup"
            exact
            component={Authentication(EmployeeSignUp, false)}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
