import { SetShop } from 'modules/shop';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateShop } from 'utils/api/shop';

export default function useShopEdit() {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shop);
  const { name, postal_code, phone_number, address } = shop;

  const [isEditModal, setIsEditModal] = useState(false);

  const onEdit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await updateShop(name, address, postal_code, phone_number, shop._id);
        window.location.reload();
      } catch (e) {
        alert('수정에 실패했습니다.');
      }
    },
    [name, address, postal_code, phone_number, shop._id],
  );

  const onToggle = useCallback(() => {
    setIsEditModal(!isEditModal);
  }, [isEditModal]);

  const onEditHandler = (location) => {
    onToggle();
    dispatch(SetShop(location));
  };

  return {
    onEditHandler,
    onToggle,
    isEditModal,
    onEdit,
  };
}
