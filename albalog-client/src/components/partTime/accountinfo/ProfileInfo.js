import React, { useState, useEffect, useRef } from 'react';
import { MdEdit } from 'react-icons/md';
import axios from 'axios';
import 'components/partTime/accountinfo/ProfileInfo.scss';
import client from 'utils/api';
import { connect, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { APIURL } from 'config';

function ProfileInfo() {
  const shop = useSelector((state) => state.shop);
  const user = useSelector((state) => state.user);
  const [form, setForm] = useState({
    name: user.name,
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
    phone: '',
    gender: '',
    birthdate: '',
  });

  // const {
  //   name,
  //   password,
  //   newPassword,
  //   newPasswordConfirm,
  //   phone,
  //   gender,
  //   birthdate,
  // } = form;

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const newForm = {
      ...form,
      [name]: value,
    };
    setForm(newForm);
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(form);
  // };

  // 유효성 검사
  const { register, handleSubmit, watch, errors } = useForm();
  console.log(watch('newPassword'));
  const newPassword = useRef();
  // password.current = watch('password');

  const onSubmit = (data) => {
    console.log('data', data);
  };

  // const [user, setUser] = useState({ user });
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const pushdata = async () => {
      try {
        // setError(null);
        // setLoading(true);
        let body = {
          //   name,
          //   birthdate,
          //   phone,
          //   gender,
          //   password,
          //   newPassword,
        };
        let response = await axios.patch(
          `${APIURL}/employee/60ca125f38caa500284f6885/update`,
          body,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNhMTI1ZjM4Y2FhNTAwMjg0ZjY4ODUiLCJyb2xlIjoic3RhZmYiLCJzdG9yZXMiOlt7Il9pZCI6IjYwY2ExMjVmMzhjYWE1MDAyODRmNjg4NiIsImxvY2F0aW9uIjoiNjBjYTBlNzkzOGNhYTUwMDI4NGY2ODdjIn1dLCJpYXQiOjE2MjM4NTU3NTF9.LB6LLNq4lUUcJ-9zUBiAKFKRkhz61BKEDkI8Q--aD0M`,
            },
          },
        );
        console.log(response.data);
      } catch (e) {
        // setError(e);
      }
      // setLoading(false);
    };
    pushdata();
  }, [user]);

  // if (loading) return <div>로딩중..</div>;
  // if (error) return <div>에러가 발생했습니다 {console.log(error)}</div>;
  // if (!account) return <div>{console.log(account)}</div>;

  return (
    <div id="ProfileInfo">
      <form onSubmit={onSubmit}>
        <div className="tr">
          <label>이름</label>
          <input
            className="content"
            name="name"
            // value={name}
            onChange={onChange}
          />
        </div>
        <div className="tr">
          <label>아이디</label>
          <div className="content">{user.email}</div>
        </div>
        <div className="tr">
          <label>현재 비밀번호</label>
          <input
            type="password"
            name="password"
            // value={password}
            onChange={onChange}
            ref={register({ required: true })}
          />
          {errors.password && <p> 비밀번호를 입력해주세요 </p>}
        </div>
        <div className="tr">
          <label>새 비밀번호</label>
          <input
            type="password"
            name="newPassword"
            // value={newPassword}
            onChange={onChange}
            ref={register({ minLength: 6 })}
          />
          {errors.newPasswordMinLength && <p> 6글자 이상 입력해주세요 </p>}
        </div>
        <div className="tr">
          <label>새 비밀번호 확인</label>
          <input
            type="password"
            name="newPasswordConfirm"
            // value={newPasswordConfirm}
            onChange={onChange}
            ref={register({
              validate: (value) => value === newPassword.current,
            })}
          />
          {errors.newPasswordConfirm &&
            errors.newPasswordConfirm.type === 'validate' && (
              <p> 새 비밀번호가 일치아지 않습니다.</p>
            )}
        </div>
        <div className="tr">
          <label className="head">전화번호</label>
          <input
            type="text"
            name="phone"
            // value={phone}
            onChange={onChange}
          />
        </div>
        <div className="tr">
          <label>성별</label>
          <div className="content">
            <label>
              <input
                type="radio"
                name="gender"
                value="남성"
                onChange={onChange}
                className="content-label"
              />
              남성
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="여성"
                onChange={onChange}
                className="content-label"
              />
              여성
            </label>
          </div>
        </div>
        <div className="tr">
          <label className="head">생년월일</label>
          <input
            type="date"
            name="birthdate"
            // value={birthdate}
            onChange={onChange}
          />
        </div>
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

export default ProfileInfo;
