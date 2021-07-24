import Aside from 'components/Aside';
import Header from 'components/Header';
import ManualForm from 'components/workManual/ManualForm';
import ManageNav from 'components/workManual/ManualManageNav';
import React from 'react';
import { useSelector } from 'react-redux';
import { createManual } from 'utils/api/workmanual';

const ManualUpload = () => {
  const shop = useSelector((state) => state.shop);
  const workManual = useSelector((state) => state.workManual);
  const { title, content, category_id } = workManual;

  // 업무매뉴얼 submit 함수
  const manualOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await createManual(shop._id, title, content, category_id);
      window.location.replace(`/${shop._id}/workmanual/list`);
    } catch (e) {
      alert('매뉴얼 등록에 실패하였습니다.');
    }
  };

  return (
    <>
      <ManualForm onSubmit={manualOnSubmit} />
    </>
  );
};

export default ManualUpload;
