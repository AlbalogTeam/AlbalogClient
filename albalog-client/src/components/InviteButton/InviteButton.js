import InviteModal from 'components/Modal/InviteModal';
import useModal from 'hooks/common/useModal';
import React from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs';

const InviteButton = () => {
  const [modalOpened, handleModal] = useModal();

  return (
    <>
      <button className="btn-invite" onClick={handleModal}>
        <span>직원초대</span>
        <BsFillPersonPlusFill size="25" />
      </button>
      {modalOpened && <InviteModal handleModal={handleModal} />}
    </>
  );
};
export default InviteButton;
