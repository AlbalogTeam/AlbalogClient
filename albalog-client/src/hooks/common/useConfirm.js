const useConfirm = (message = null, onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== 'function') {
    return;
  }
  if (onCancel && typeof onCancel !== 'function') {
    return;
  }

  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };

  return confirmAction;
};

export default useConfirm;

/**
 * 사용 법 : 아래 줄 복사해서 필요한 컴포넌트에 붙여넣기 하면 됨.
 * const confirmDelete = useConfirm(
    '삭제하시겠습니까?',   // 메세지 문구 
    noticeDelete, // 확인 버튼 눌렀을 때 일어나는 함수
    cancelConfirm, // 취소 버튼 눌렀을 때 일어나는 함수
  );
 */
