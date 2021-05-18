import AdminHeader from 'components/admin/AdminHeader/AdminHeader';
import Notice from 'pages/Notice/Notice';
import React from 'react';

const App = () => {
  return (
    <div>
      <AdminHeader />
      <div id="container">
        <Notice />
      </div>
    </div>
  );
};

export default App;
