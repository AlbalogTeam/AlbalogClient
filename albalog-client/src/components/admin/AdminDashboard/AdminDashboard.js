import Aside from 'components/Aside/Aside';
import CommutingStatus from 'components/CommutingStatus/CommutingStatus';
import Footer from 'components/Footer/Footer';
import HandOver from 'components/HandOver/HandOver';
import Header from 'components/Header/Header';
import Notice from 'components/notice/Notice';
import React from 'react';
import { useSelector } from 'react-redux';
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
