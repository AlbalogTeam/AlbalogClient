import { setTransition } from 'modules/transition';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTransition,
  deleteTransition,
  getTransitions,
  toggleTransition,
  updateTransition,
} from 'utils/api/transition';

export default function useTransitionHandle(date) {
  const [transitions, setTransitions] = useState([]);
  const [description, setDescription] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [messageModalState, setMessageModalState] = useState(false);
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shop);
  const user = useSelector((state) => state.user);
  const transition = useSelector((state) => state.transition);
  const { year, month, day } = date;

  useEffect(() => {
    const getData = async () => {
      setLoadingState(false);
      const transitions = await getTransitions(shop._id, year, month, day);
      setTransitions(transitions);
      setLoadingState(true);
    };
    if (shop._id) {
      getData();
    }
  }, [day, month, year, shop._id]);

  const onChangeDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  // 인수인계 추가
  const onCreate = useCallback(async () => {
    try {
      const transitions = await createTransition(
        shop._id,
        `${year}-${month}-${day}`,
        description,
        user._id,
      );
      setTransitions(transitions);
      setDescription('');
    } catch (e) {
      alert('인수인계 추가에 실패하였습니다.');
    }
  }, [day, month, shop._id, year, user._id, description]);

  // 인수인계 삭제
  const onDelete = useCallback(async () => {
    try {
      const transitions = await deleteTransition(shop._id, transition._id);
      setMessageModalState(!messageModalState);
      setTransitions(transitions);
    } catch (e) {
      alert('인수인계 삭제에 실패했습니다.');
    }
  }, [messageModalState, shop._id, transition._id]);

  const onChangeDescriptionUpdate = useCallback((e) => {
    setUpdateDescription(e.target.innerText);
  }, []);

  // 인수인계 수정
  const onUpdate = useCallback(
    async (e) => {
      try {
        const transitions = await updateTransition(
          shop._id,
          e.target.id,
          updateDescription,
          user._id,
        );
        setTransitions(transitions);
      } catch (e) {
        alert('인수인계 수정에 실패하였습니다.');
      }
    },
    [updateDescription, shop._id, user._id],
  );
  // 인수인계 체크박스
  const onToggle = useCallback(
    async (transitionId) => {
      try {
        const transitions = await toggleTransition(
          shop._id,
          transitionId,
          user._id,
        );
        setTransitions(transitions);
      } catch (e) {
        alert('인수인계 체크박스를 실패하였습니다.');
      }
    },
    [shop._id, user._id],
  );

  const messageModalToggle = useCallback(
    (transition) => {
      setMessageModalState(!messageModalState);
      dispatch(setTransition(transition));
    },
    [dispatch, messageModalState],
  );

  return {
    onCreate,
    onDelete,
    onUpdate,
    onToggle,
    onChangeDescription,
    onChangeDescriptionUpdate,
    messageModalToggle,
    transitions,
    description,
    loadingState,
    messageModalState,
  };
}
