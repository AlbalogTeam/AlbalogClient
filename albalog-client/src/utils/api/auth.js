import axios from 'axios';
import { APIURL } from 'config';
import client from './client';

/* 회원가입 관련 */
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
  return response.data;
};

/* 로그인 & 로그아웃 관련 */

// 로그인
export const login = async (email, password) => {
  const body = {
    email,
    password,
  };
  const response = await axios.post(`${APIURL}/login`, body);
  return response;
};

// 관리자 로그아웃
export const adminLogout = async () => {
  const response = await client.post('/owner/logout');
  return response;
};

// 알바 로그아웃
export const parttimeLogout = async () => {
  const response = await client.post('/employee/logout');
  return response;
};
