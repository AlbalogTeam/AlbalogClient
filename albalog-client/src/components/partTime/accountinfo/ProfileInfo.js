import React from 'react';
import 'components/partTime/accountinfo/ProfileInfo.scss';
import { useForm } from 'react-hook-form';
import useUpdate from 'hooks/parttime/useUpdate';

function ProfileInfo() {
  // 유효성 검사
  const { register, handleSubmit, watch, errors } = useForm();
  const { onChange, onSubmit, form, user } = useUpdate();
  const {
    name,
    password,
    newPassword,
    newPasswordConfirm,
    phone,
    gender,
    birthdate,
  } = form;

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
            ref={register()}
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
              <p> 새 비밀번호와 동일하지 않습니다</p>
            )}
          {errors.cellphone && <p> 전화번호를 입력해주세요 </p>}
          {errors.birthdate && <p> 생년월일을 입력해주세요 </p>}
        </div>
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

export default ProfileInfo;
