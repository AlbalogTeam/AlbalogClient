import AdminAside from 'components/admin/AdminAside/AdminAside';
import AdminHeader from 'components/admin/AdminHeader/AdminHeader';
import AdminInfo from 'components/admin/AdminInfo/AdminInfo';
import AdminDashboardPage from 'pages/admin/AdminDashboardPage';
import AdminEmployeePage from 'pages/admin/AdminEmployeePage';
import AdminInfoPage from 'pages/admin/AdminInfoPage';
import AdminPayrollPage from 'pages/admin/AdminPayrollPage';
import AdminSchedulePage from 'pages/admin/AdminSchedulePage';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <AdminHeader />
      <AdminAside />
      <Switch>
        <Route path="/" exact component={AdminDashboardPage} />
        <Route path="/admin/info" component={AdminInfoPage} />
        <Route path="/admin/payroll" component={AdminPayrollPage} />
        <Route path="/admin/employeelist" component={AdminEmployeePage} />
        <Route path="/admin/schedule" component={AdminSchedulePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
