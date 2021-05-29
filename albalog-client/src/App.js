import AdminAside from 'components/admin/AdminAside/AdminAside';
import AdminHeader from 'components/admin/AdminHeader/AdminHeader';
import AdminDashboardPage from 'pages/admin/AdminDashboardPage';
import AdminEmployeePage from 'pages/admin/AdminEmployeePage';
import AdminInfoPage from 'pages/admin/AdminInfoPage';
import AdminPayrollPage from 'pages/admin/AdminPayrollPage';
// import AdminSchedulePage from 'pages/admin/AdminSchedulePage';
import NoticeList from 'pages/notice/NoticeList/NoticeList';
import NoticeDetail from 'pages/notice/NoticeDetail/NoticeDetail';
import { Route, Switch } from 'react-router-dom';
import NoticeUpload from 'pages/notice/NoticeUpload/NoticeUpload';
import NoticeEdit from 'pages/notice/NoticeEdit/NoticeEdit';
import WorkManual from 'pages/workManual/WorkManual';
// import Transition from 'pages/transition/Transition';
import Landing from 'pages/landing/Landing';
import PartTimeDashboard from 'pages/partTime/PartTimeDashboard';
import Login from 'components/Login';
import SignUp from 'components/SignUp';
import AccountInfo from 'pages/partTime/AccountInfo';
import WorkingTime from 'pages/partTime/WorkingTime';
import React from 'react';

const App = () => {
  return (
    <div id="container">
      <AdminHeader />
      <AdminAside />
      <div id="main">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/notice" exact component={NoticeList} />
          <Route path="/notice/upload" exact component={NoticeUpload} />
          <Route path="/notice/:id?" exact component={NoticeDetail} />
          <Route path="/notice/edit/:id?" exact component={NoticeEdit} />
          <Route path="/workmanual/:category?" exact component={WorkManual} />
          {/* <Route path="/transition" exact component={Transition} /> */}
          <Route path="/admin" exact component={AdminDashboardPage} />
          <Route path="/admin/info" component={AdminInfoPage} />
          <Route path="/admin/payroll" component={AdminPayrollPage} />
          <Route path="/admin/employeelist" component={AdminEmployeePage} />
          {/* <Route path="/admin/schedule" component={AdminSchedulePage} /> */}
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route
            path="/parttimedashboard"
            component={PartTimeDashboard}
            exact
          />
          <Route path="/accountinfo" component={AccountInfo} exact />
          <Route path="/workingtime" component={WorkingTime} exact />
        </Switch>
      </div>
    </div>
  );
};

export default App;
