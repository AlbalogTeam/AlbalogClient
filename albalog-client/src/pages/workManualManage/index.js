import Aside from 'components/Aside';
import Header from 'components/Header';
import ManageNav from 'components/workManual/ManualManageNav';
import React from 'react';
import { Route } from 'react-router';
import Authentication from 'utils/authentication';
import CategoryManage from './CategoryManage';
import ManualUpload from './ManualUpload';

const WorkManualManage = () => {
  return (
    <>
      <div>
        <Header />
        <Aside />
        <ManageNav />
        <Route
          path="/:shop?/workmanual/manage/category"
          exact
          component={Authentication(CategoryManage, true, 'admin')}
        />
        <Route
          path="/:shop?/workmanual/manage/upload"
          exact
          component={Authentication(ManualUpload, true, 'admin')}
        />
      </div>
    </>
  );
};

export default WorkManualManage;
