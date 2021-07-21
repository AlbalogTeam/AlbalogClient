import { UserStateEmpty } from 'modules/user';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout, parttimeLogout } from 'utils/api/auth';

export default function useLogout() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onAdminLogout = async () => {
    try {
      await adminLogout();
      sessionStorage.removeItem('user');
      dispatch(UserStateEmpty());
    } catch (e) {
      alert('로그아웃에 실패했습니다.');
    }
  };

  const onParttimeLogout = async () => {
    try {
      await parttimeLogout();
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('parttime');
      dispatch(UserStateEmpty());
    } catch (e) {
      alert('로그아웃에 실패했습니다.');
    }
  };

  const onLogout = async () => {
    if (user.role === 'owner') onAdminLogout();
    if (user.role === 'staff') onParttimeLogout();
  };

  return {
    onLogout,
  };
}
