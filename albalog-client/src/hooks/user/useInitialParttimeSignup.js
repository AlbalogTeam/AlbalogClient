import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { parttimeRegister } from 'utils/api/auth';
import { getInviteToken } from 'utils/api/user';
import jwt from 'jsonwebtoken';
import { TOKENKEY } from 'config';
import { useDispatch } from 'react-redux';
import { SetUser } from 'modules/user';
import { SetParttime } from 'modules/parttime';

export default function useInitialParttimeSignup() {
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const inviteToken = match.params.invitetoken;
  const shopId = match.params.shop;
  const [shopName, setShopName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const [form, setForm] = useState({
    password: '',
    passwordCheck: '',
    cellphone: '',
    birthdate: null,
    gender: '',
  });

  const { password, passwordCheck, cellphone, birthdate, gender } = form;

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await getInviteToken(shopId, inviteToken);
        setShopName(token.location_name);
        setUserEmail(token.user_email);
        setUserName(token.user_name);
      } catch (e) {
        alert('유효하지 않은 링크입니다.');
        history.push('/login');
      }
    };
    getData();
  }, [history, inviteToken, shopId]);

  const onChange = (e) => {
    const { value, name } = e.target;
    const nextForm = {
      ...form,
      [name]: value,
    };
    setForm(nextForm);
  };

  const onSignup = async () => {
    try {
      const response = await parttimeRegister(
        userName,
        userEmail,
        password,
        birthdate,
        cellphone,
        gender,
        shopId,
      );
      const token = response.token;
      const decoded = jwt.verify(token, TOKENKEY);

      let userBody = {
        _id: response.employee._id,
        email: response.employee.email,
        name: response.employee.name,
        role: decoded.role,
        token: response.token,
      };
      dispatch(SetUser(userBody));
      dispatch(SetParttime(response.employee));
      sessionStorage.setItem('parttime', JSON.stringify(response.employee));
    } catch (e) {
      alert('회원가입에 실패했습니다.');
    }
  };

  return {
    shopName,
    userEmail,
    userName,
    password,
    passwordCheck,
    cellphone,
    birthdate,
    gender,
    onChange,
    onSignup,
  };
}
