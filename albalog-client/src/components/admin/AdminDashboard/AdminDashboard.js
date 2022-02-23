import React from 'react';
import Aside from 'components/Aside';
import CommutingStatus from 'components/CommutingStatus';
import Footer from 'components/Footer';
import HandOver from 'components/HandOver';
import Header from 'components/Header';
import Notice from 'components/Notice';
import './AdminDashboard.scss';

const AdminDashboard = () => {
  return (
    <>
      <Header />
      <Aside />
      <div className="AdminDashboard">
        <Notice />
        <HandOver />
        <CommutingStatus />
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
