import Aside from 'components/Aside';
import Header from 'components/Header';
import ManualForm from 'components/workManual/ManualForm';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { updateManual } from 'utils/api/workmanual';

const ManualEdit = () => {
  const shop = useSelector((state) => state.shop);
  const workManual = useSelector((state) => state.workManual);
  const { title, content, category_id } = workManual;
  // 업무매뉴얼 submit 함수
  const manualOnSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await updateManual(
          shop._id,
          workManual._id,
          title,
          content,
          category_id,
        );
        window.location.replace(`/${shop._id}/workmanual/list`);
      } catch (e) {
        alert('매뉴얼 수정에 실패했습니다');
      }
    },
    [category_id, content, title, shop._id, workManual._id],
  );
  return (
    <>
      <Header />
      <Aside />
      <ManualForm onSubmit={manualOnSubmit} />
    </>
  );
};

export default ManualEdit;
