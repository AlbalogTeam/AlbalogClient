import AdminAside from 'components/admin/AdminAside/AdminAside';
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
import ParttimeAside from 'components/partTime/aside/ParttimeAside';
import Header from 'components/Header/Header';

const App = () => {
  return (
    <div id="container">
      <div id="main">
        <Switch>
          <Route path="/" exact component={Landing}></Route>
          <Route path="/:shop?/notice" exact>
            <Header />
            <AdminAside />
            <NoticeList />
          </Route>
          <Route path="/:shop?/notice/edit/:id?" component={NoticeEdit} />
          <Route path="/:shop?/notice/upload">
            <Header />
            <AdminAside />
            <NoticeUpload />
          </Route>
          <Route path="/:shop?/notice/:id?" component={NoticeDetail} />
          <Route path="/workmanual/:category?" component={WorkManual} />

          <Route path="/transition" exact>
            <Header />
            <AdminAside />
            <Transition />
          </Route>
          <Route path="/admin/:shop" exact>
            <Header />
            <AdminAside />
            <AdminDashboardPage />
          </Route>
          <Route path="/admin/info">
            <Header />
            <AdminAside />
            <AdminInfoPage />
          </Route>
          <Route path="/admin/payroll">
            <Header />
            <AdminAside />
            <AdminPayrollPage />
          </Route>
          <Route path="/admin/employeelist">
            <Header />
            <AdminAside />
            <AdminEmployeePage />
          </Route>
          {/* <Route path="/admin/schedule" component={AdminSchedulePage} /> */}
          <Route path="/login" component={Login} exact></Route>
          <Route path="/signup" component={SignUp} exact></Route>
          <Route path="/parttime" exact>
            <ParttimeHeader />
            <ParttimeAside />
            <PartTimeDashboard />
          </Route>
          <Route path="/parttime/accountinfo" exact>
            <ParttimeHeader />
            <ParttimeAside />
            <AccountInfo />
          </Route>
          <Route path="/parttime/workingtime" exact>
            <ParttimeHeader />
            <ParttimeAside />
            <WorkingTime />
          </Route>
          <Route path="/parttime/scheduler" exact>
            <ParttimeHeader />
            <ParttimeAside />
            <ParttimeScheduler />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
