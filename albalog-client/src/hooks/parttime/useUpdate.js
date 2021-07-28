import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SetUser, UserStateEmpty } from 'modules/user';
import { SetParttime } from 'modules/parttime';
import { patchUpdate } from 'utils/api/parttime';
import { useState } from 'react';

export default function useUpdate() {
  const shop = useSelector((state) => state.shop);
  const user = useSelector((state) => state.user);
  const parttime = useSelector((state) => state.parttime);

  const [form, setForm] = useState({
    name: user.name,
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
    gender: parttime.gender,
    birthdate: parttime.birthdate.slice(0, 10),
    phone: parttime.cellphone,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (e) => {
    const { name, value } = e.target;
    const newForm = {
      ...form,
      [name]: value,
    };
    setForm(newForm);
  };

  const onSubmit = async (body) => {
    if (!!body.newPassword) {
      try {
        await patchUpdate(shop._id, body);
        alert('변경된 비밀번호로 다시 로그인 해주세요');
        sessionStorage.removeItem('user'); // localStorage에서 user를 제거
        dispatch(UserStateEmpty());
        history.push('/login');
      } catch (e) {
        alert(e.response.data.message);
        console.log('Error : ' + e.response.data.message);
      }
    } else {
      try {
        await patchUpdate(shop._id, body);
        let userBody = {
          ...user,
          name: body.name,
        };
        let parttimeBody = {
          ...parttime,
          birthdate: body.birthdate,
          gender: body.gender,
          cellphone: body.phone,
        };
        sessionStorage.setItem('parttime', JSON.stringify(parttimeBody));
        sessionStorage.setItem('user', JSON.stringify(userBody));
        dispatch(SetUser(userBody));
        dispatch(SetParttime(parttimeBody));
        window.location.replace(`/parttime/${shop._id}/accountinfo`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { onChange, onSubmit, form, user };
}
