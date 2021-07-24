import {
  AdminDashboardPage,
  AdminEmployeePage,
  AdminInfoPage,
  AdminPayrollPage,
  AdminSchedulePage,
} from 'pages/admin';
import NoticeList from 'pages/notice/NoticeList';
import NoticeDetail from 'pages/notice/NoticeDetail';
import { Route, Switch } from 'react-router-dom';
import NoticeUpload from 'pages/notice/NoticeUpload';
import NoticeEdit from 'pages/notice/NoticeEdit';
import WorkManual from 'pages/workManual';
import Transition from 'pages/transition';
import Landing from 'pages/landing';
import PartTimeDashboard from 'pages/partTime/PartTimeDashboard';
import Login from 'pages/login';
import AdminSignup from 'pages/adminSignup';
import AccountInfo from 'pages/partTime/AccountInfo';
import WorkingTime from 'pages/partTime/WorkingTime';
import React from 'react';
import Authentication from 'utils/authentication';
import ParttimeScheduler from 'pages/partTime/schedule/ParttimeScheduler';
import EmployeeSignUp from 'pages/employeeSignUp';
import MobileCategory from 'pages/mobileCategory';
import FindPassword from 'pages/findPassword';
import ResetPassword from 'pages/findPassword/ResetPassword';
import EmployeeJoin from 'pages/existParttimeSignup';
import CategoryManage from 'pages/workManualManage/CategoryManage';
import ManualUpload from 'pages/workManualManage/ManualUpload';
import ManualEdit from 'pages/workManualManage/ManualEdit';
import WorkManualManage from 'pages/workManualManage';

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
            component={Authentication(AdminSignup, false)}
            exact
          />
          <Route
            path="/findpassword"
            exact
            component={Authentication(FindPassword, false)}
          />
          <Route
            path="/reset_password/:tokenid"
            exact
            component={Authentication(ResetPassword, false)}
          />

          <Route
            path="/:shop/mobile/category"
            exact
            component={Authentication(MobileCategory, true)}
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
            path="/:shop?/workmanual/manage/"
            component={Authentication(WorkManualManage, true, 'admin')}
          />

          <Route
            path="/:shop?/workmanual/edit/:id"
            exact
            component={Authentication(ManualEdit, true, 'admin')}
          />
          <Route
            path="/:shop?/workmanual/list/:category?"
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
            path="/admin/:shop?/schedule"
            exact
            component={Authentication(AdminSchedulePage, true, true)}
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
            path="/parttime/:shop/:invitetoken/signup"
            exact
            component={Authentication(EmployeeSignUp, false)}
          />

          <Route
            path="/parttime/:shop/:invitetoken/join"
            exact
            component={Authentication(EmployeeJoin, false)}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
