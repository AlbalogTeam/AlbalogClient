import { SetUser } from 'modules/user';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { patchAdminInfo } from 'utils/api/user';

export default function useAdminInfo() {
  const history = useHistory();
  const { name: originName, email } = useSelector(({ user }) => user);
  const [form, setForm] = useState({
    name: originName,
    password: '',
    newPassword: '',
    newPasswordCheck: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const { name, password, newPassword, newPasswordCheck } = form;

  const onSubmit = async (e) => {
    e.preventDefault();

    if ([name, password].includes('')) {
      setError('이름이나 비밀번호를 입력하세요');
      return;
    } else if (name.length < 2) {
      setError('이름은 최소 2글자 이상입니다.');
      return;
    } else if (password.length < 6) {
      setError('비밀번호는 최소 6자리 이상입니다.');
      return;
    }

    // 새로운 비밀번호를 입력하지 않았으면(빈 문자열)이면 넘어가고,
    if ([newPassword].includes('') && newPasswordCheck.includes('')) {
    } else {
      // 빈문자열이 아니라면 둘이 같은지 , 6자리 이상인지 체크
      console.log('else 진입');
      if (newPassword.length < 6 || newPasswordCheck.length < 6) {
        console.log('6자리 이하');
        setError('새로운 비밀번호는 최소 6자리 이상입니다.');
        return;
      }
      if (newPassword !== newPasswordCheck) {
        setError('새로운 비밀번호가 서로 다릅니다.');
        return;
      }
    }

    try {
      const response = await patchAdminInfo({
        name,
        email,
        password,
        newPassword,
      });
      console.log(response);
      if (response.status === 200) {
        alert('다시 로그인 해주세요');
        sessionStorage.removeItem('user'); // localStorage에서 user를 제거
        let UserBody = {
          _id: '',
          email: '',
          name: '',
          role: '',
          token: '',
        };
        dispatch(SetUser(UserBody)); // user redux를 초기값으로 설정
        history.push('/login');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  return {
    name,
    email,
    password,
    newPassword,
    newPasswordCheck,
    error,
    onChange,
    onSubmit,
  };
}
