import { TOKENKEY } from 'config';
import jwt from 'jsonwebtoken';
import { ChangeField } from 'modules/auth';
import { SetParttime } from 'modules/parttime';
import { SetUser } from 'modules/user';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'utils/api/user';

export default function useLogin() {
  const form = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  const { email, password } = form;

  const onLogin = async () => {
    try {
      const response = await login(email, password);
      const token = response.data.token;
      const decoded = jwt.verify(token, TOKENKEY);
      let userBody = {
        _id: response.data.user._id,
        email: response.data.user.email,
        name: response.data.user.name,
        role: decoded.role,
        token: response.data.token,
      };
      if (decoded.role === 'staff') {
        dispatch(SetParttime(response.data.user));
        sessionStorage.setItem('parttime', JSON.stringify(response.data.user));
      }
      dispatch(SetUser(userBody));
    } catch (e) {
      alert('로그인에 실패했습니다.');
      console.log(e);
    }
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    let FormBody = {
      form: 'login',
      key: name,
      value,
    };
    dispatch(ChangeField(FormBody));
  };

  return {
    onLogin,
    onChange,
  };
}
