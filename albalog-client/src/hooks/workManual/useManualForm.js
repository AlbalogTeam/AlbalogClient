import { WorkManualForm } from 'modules/workManual';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useManualForm() {
  const dispatch = useDispatch();
  const workManual = useSelector((state) => state.workManual);
  const { title, content } = workManual;
  // Form 입력 값 onChange 함수
  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      let body = {
        key: name,
        value,
      };
      dispatch(WorkManualForm(body));
    },
    [dispatch],
  );

  return {
    onChange,
    workManual,
    title,
    content,
  };
}
