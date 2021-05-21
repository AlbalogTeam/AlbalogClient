import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminHeader from 'components/admin/AdminHeader/AdminHeader';
import PartTimeDashboard from 'pages/partTime/PartTimeDashboard';

const App = () => {
  return (
    <div className="App">
      {/* <AdminHeader /> */}
      <div id="main">
        <Switch>
        <Route path ="/parttimedashboard" component={PartTimeDashboard} exact />
        <Route path ="/" component={Login} exact/>
        <Route path ="/signup" component={SignUp} exact/>
        </Switch>
      </div>
    </div>
  );
};

export default App;
