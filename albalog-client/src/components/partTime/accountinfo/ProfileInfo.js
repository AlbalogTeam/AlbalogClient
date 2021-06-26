import React, { useState, useEffect, useRef } from 'react';
import { MdEdit } from 'react-icons/md';
import axios from 'axios';
import 'components/partTime/accountinfo/ProfileInfo.scss';
import client from 'utils/api';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { SetUser } from 'modules/user';

function ProfileInfo() {
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
  const {
    name,
    password,
    newPassword,
    newPasswordConfirm,
    phone,
    gender,
    birthdate,
  } = form;

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
  // console.log(watch('name'));
  const onSubmit = async (body) => {
    console.log('data', body);
    // useEffect(() => {
    //   const pushdata = async () => {
    try {
      // let body = {
      //   name,
      //   birthdate,
      //   cellphone,
      //   gender,
      //   password,
      //   newPassword,
      // };
      let response = await client.patch(`/employee/${shop._id}/update`, body);
      console.log(response);
      if (response.status === 200) {
        // window.location.replace(`/parttime/${shop._id}/accountinfo`); // 페이지 이동 후 새로고침
        alert('변경된 비밀번호로 다시 로그인 해주세요');
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
      console.log('Error : ' + e);
    }
  };
  //     pushdata();
  //   }, [user]);
  // };

  return (
    <div id="ProfileInfo">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="tr">
          <label>이름</label>
          <input
            className="content"
            name="name"
            value={name}
            onChange={onChange}
            ref={register({ required: true, minLength: 2 })}
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
            value={password}
            onChange={onChange}
            ref={register({ required: true })}
          />
        </div>
        <div className="tr">
          <label>새 비밀번호</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={onChange}
            ref={register({ minLength: 6 })}
          />
        </div>
        <div className="tr">
          <label>새 비밀번호 확인</label>
          <input
            type="password"
            name="newPasswordConfirm"
            value={newPasswordConfirm}
            onChange={onChange}
            ref={register({
              validate: (value) => value === newPassword,
            })}
          />
        </div>
        <div className="tr">
          <label className="head">전화번호</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={onChange}
            ref={register({ required: true })}
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
                checked={gender === '남성' ? true : false}
                onChange={onChange}
                checked={gender === '남성' ? true : false}
                className="content-label"
                ref={register({ required: true })}
              />
              남성
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="여성"
                checked={gender === '여성' ? true : false}
                onChange={onChange}
                className="content-label"
                ref={register({ required: true })}
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
            value={birthdate}
            onChange={onChange}
            ref={register({ required: true })}
          />
        </div>
        <div className="tr-warning">
          {errors.name && errors.name.type === 'required' && (
            <p> 이름을 입력해주세요 </p>
          )}
          {errors.name && errors.name.type === 'minLength' && (
            <p> 이름을 2글자 이상 입력해주세요 </p>
          )}
          {errors.password && <p> 비밀번호를 입력해주세요 </p>}
          {errors.newPassword && <p> 비밀번호를 6글자 이상 입력해주세요 </p>}
          {errors.newPasswordConfirm &&
            errors.newPasswordConfirm.type === 'validate' && (
              <p> 새 비밀번호가 동일하지 않습니다</p>
            )}
          {errors.cellphone && <p> 비밀번호를 입력해주세요 </p>}
          {errors.gender && <p> 성별을 입력해주세요 </p>}
          {errors.birthdate && <p> 생년월일을 입력해주세요 </p>}
        </div>
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

export default ProfileInfo;
