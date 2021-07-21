import { useState } from 'react';
import { useSelector } from 'react-redux';
import { postSignUpMail } from 'utils/api/user';

export default function useInviteModal() {
  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  const { name, email } = form;

  const locationId = useSelector(({ shop }) => shop._id);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const postForm = async () => {
      try {
        const response = await postSignUpMail({ locationId, name, email });
        alert('메일 전송 성공 !');
        console.log(response);
      } catch (e) {
        console.log(e.response.data);
        if (!e.response.data.success) {
          alert('이미 해당 매장의 직원으로 등록되어있습니다');
        } else {
          alert('메일 전송을 실패하였습니다.');
        }
      }
    };

    postForm();

    setForm({
      name: '',
      email: '',
    });
  };
  return {
    name,
    email,
    onChange,
    onSubmit,
  };
}
