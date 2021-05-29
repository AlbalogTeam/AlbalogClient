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
import Transition from 'pages/transition/Transition';
import Landing from 'pages/landing/Landing';
import PartTimeDashboard from 'pages/partTime/PartTimeDashboard';
import Login from 'components/Login';
import SignUp from 'components/SignUp';
import AccountInfo from 'pages/partTime/AccountInfo';
import WorkingTime from 'pages/partTime/WorkingTime';
import React from 'react';
import ParttimeHeader from 'components/partTime/header/ParttimeHeader';
import ParttimeAside from 'components/partTime/aside/ParttimeAside';

const App = () => {
  return (
    <div id="container">
      <div id="main">
        <Switch>
          <Route path="/" exact component={Landing}></Route>
          <Route path="/notice" exact>
            <ParttimeHeader />
            <ParttimeAside />
            <NoticeList />
          </Route>
          <Route path="/notice/upload" exact>
            <ParttimeHeader />
            <ParttimeAside />
            <NoticeUpload />
          </Route>
          <Route path="/notice/:id?" exact component={NoticeDetail}></Route>
          <Route path="/notice/edit/:id?" exact component={NoticeEdit}></Route>
          <Route path="/workmanual/:category?" component={WorkManual} />

          <Route path="/transition" exact>
            <ParttimeHeader />
            <ParttimeAside />
            <Transition />
          </Route>
          <Route path="/admin" exact>
            <AdminHeader />
            <AdminAside />
            <AdminDashboardPage />
          </Route>
          <Route path="/admin/info">
            <AdminHeader />
            <AdminAside />
            <AdminInfoPage />
          </Route>
          <Route path="/admin/payroll">
            <AdminHeader />
            <AdminAside />
            <AdminPayrollPage />
          </Route>
          <Route path="/admin/employeelist">
            <AdminHeader />
            <AdminAside />
            <AdminEmployeePage />
          </Route>
          {/* <Route path="/admin/schedule" component={AdminSchedulePage} /> */}
          <Route path="/login" component={Login} exact></Route>
          <Route path="/signup" component={SignUp} exact></Route>
          <Route path="/parttimedashboard" exact>
            <ParttimeHeader />
            <ParttimeAside />
            <PartTimeDashboard />
          </Route>
          <Route path="/accountinfo" exact>
            <ParttimeHeader />
            <ParttimeAside />
            <AccountInfo />
          </Route>
          <Route path="/workingtime" exact>
            <ParttimeHeader />
            <ParttimeAside />
            <WorkingTime />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
