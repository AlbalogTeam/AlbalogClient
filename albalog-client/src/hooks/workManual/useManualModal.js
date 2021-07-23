import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useManualModal() {
  const user = useSelector((state) => state.user);
  const [isUploadModal, setIsUploadModal] = useState(false);
  const [isCategoryModal, setIsCategoryModal] = useState(false);

  const onToggleForManual = useCallback(() => {
    setIsUploadModal(!isUploadModal);
  }, [isUploadModal]);

  const onToggleForCategory = useCallback(() => {
    setIsCategoryModal(!isCategoryModal);
  }, [isCategoryModal]);

  return {
    user,
    isUploadModal,
    onToggleForManual,
    onToggleForCategory,
    isCategoryModal,
  };
}
