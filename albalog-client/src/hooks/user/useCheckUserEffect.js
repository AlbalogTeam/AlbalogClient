import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function useCheckUserEffect() {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (user.email) {
      history.push('/');
      try {
        sessionStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log(e);
      }
    }
  }, [history, user]);
}
