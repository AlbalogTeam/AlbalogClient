import { useState } from 'react';

export default function useModal() {
  const [modalOpened, setModalOpened] = useState(false);

  const handleModal = () => {
    setModalOpened(!modalOpened);
  };

  return [modalOpened, handleModal];
}
