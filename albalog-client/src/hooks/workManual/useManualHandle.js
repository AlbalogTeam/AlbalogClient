import { setWorkManual } from 'modules/workManual';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteManual, getWorkManuals } from 'utils/api/workmanual';

export default function useManualHandle(category) {
  const [loadingState, setLoadingState] = useState(false);
  const [manualList, setManualList] = useState([]);
  const [deleteState, setDeleteState] = useState(false);
  const shop = useSelector((state) => state.shop);
  const user = useSelector((state) => state.user);
  const manual = useSelector((state) => state.workManual);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      setLoadingState(false);
      const workmanuals = await getWorkManuals(shop._id);
      if (category === 'all') {
        setManualList(workmanuals);
      } else {
        setManualList(
          workmanuals.filter((manual) => manual.category_id.name === category),
        );
      }
      setLoadingState(true);
    };
    if (shop.name) {
      getData();
    }
  }, [shop, category]);

  const ToggleButton = useCallback(() => {
    setDeleteState(!deleteState);
  }, [deleteState]);

  // 매뉴얼 수정 함수
  const EditHandle = useCallback(
    (manual) => {
      let manualBody = {
        _id: manual._id,
        category_id: manual.category_id,
        title: manual.title,
        content: manual.content,
      };

      dispatch(setWorkManual(manualBody));
      history.push(`/${shop._id}/workmanual/edit/${manual._id}`);
    },
    [dispatch, history, shop._id],
  );

  const DeleteHandle = (manual) => {
    dispatch(
      setWorkManual({
        _id: manual._id,
      }),
    );
    ToggleButton();
  };

  // 매뉴얼 삭제 함수
  const onDelete = useCallback(async () => {
    console.log(manual._id);
    try {
      await deleteManual(shop._id, manual._id);
      window.location.replace(`/${shop._id}/workmanual/list`);
    } catch (e) {
      alert('매뉴얼 삭제에 실패하였습니다.');
    }
  }, [shop._id, manual._id]);

  return {
    ToggleButton,
    EditHandle,
    DeleteHandle,
    onDelete,
    manualList,
    loadingState,
    deleteState,
    shop,
    user,
  };
}
