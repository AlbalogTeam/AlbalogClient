import React from 'react';
import { useSelector } from 'react-redux';
import Aside from 'components/Aside';
import CommutingStatus from 'components/CommutingStatus';
import Footer from 'components/Footer';
import HandOver from 'components/HandOver';
import Header from 'components/Header';
import Notice from 'components/Notice';
import './AdminDashboard.scss';

const AdminDashboard = () => {
  const shopId = useSelector(({ shop }) => shop._id);
  return (
    <>
      <Header />
      <Aside />
      <div className="AdminDashboard">
        <Notice />
        <HandOver shopId={shopId} />
        <CommutingStatus shopId={shopId} />
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
