import axios from 'axios';
import { APIURL } from 'config';
import client from 'utils/api/client';

// 이메일 중복확인
export const checkEmailValidation = async (email) => {
  const response = await axios.post(`${APIURL}/owner/check`, { email });
  return response;
};

// 관리자 회원가입
export const ownerRegister = async (email, name, password) => {
  const body = {
    email,
    name,
    password,
  };
  const response = await axios.post(`${APIURL}/owner/signup`, body);
  return response;
};

// 직원 회원가입
export const parttimeRegister = async (
  name,
  email,
  password,
  birthdate,
  cellphone,
  gender,
  shopId,
) => {
  const body = {
    name,
    email,
    password,
    birthdate,
    cellphone,
    gender,
  };
  const response = await axios.post(
    `${APIURL}/employee/${shopId}/signup`,
    body,
  );
  return response;
};

// 직원 초대 토큰
export const getInviteToken = async (shopId, inviteToken) => {
  const response = await axios.get(
    `${APIURL}/employee/${shopId}/${inviteToken}/signup`,
  );
  return response;
};

// 로그인
export const login = async (email, password) => {
  const body = {
    email,
    password,
  };
  const response = await axios.post(`${APIURL}/login`, body);
  return response;
};

// 비밀번호 찾기 메일 전송
export const findPasswordEmail = async (name, email) => {
  const body = {
    name,
    email,
  };
  const response = await axios.post(`${APIURL}/reset`, body);
  return response;
};

// 새 비밀번호 설정
export const resetPassword = async (tokenId, newPassword) => {
  const body = {
    tokenId,
    newPassword,
  };
  const response = await axios.patch(`${APIURL}/reset_password`, body);
  return response;
};

// 관리자 로그아웃
export const ownerLogout = async () => {
  const response = await client.post('/owner/logout');
  return response;
};

// 알바 로그아웃
export const parttimeLogout = async () => {
  const response = await client.post('/employee/logout');
  return response;
};

// 이미 가입된 직원 가입시 정보 불러오기
export const getJoinInfo = async (shopId, invitetoken) => {
  const response = await axios.get(
    `${APIURL}/location/${shopId}/${invitetoken}/join`,
  );
  return response;
};

// 이미 가입된 직원 매장 가입 시키기
export const Join = async (shopId, invitetoken) => {
  const response = await axios.post(
    `${APIURL}/location/${shopId}/${invitetoken}/join`,
  );
  return response;
};
