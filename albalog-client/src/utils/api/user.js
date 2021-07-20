import axios from 'axios';
import { APIURL } from 'config';
import client from 'utils/api/client';

/* 비밀번호 관련 */

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

// 이메일 중복확인
export const checkEmailValidation = async (email) => {
  const response = await axios.post(`${APIURL}/owner/check`, { email });
  return response;
};

// 직원 초대 토큰
export const getInviteToken = async (shopId, inviteToken) => {
  const response = await axios.get(
    `${APIURL}/employee/${shopId}/${inviteToken}/signup`,
  );
  return response;
};

// 직원 메일 초대 API
export const postSignUpMail = async ({ locationId, name, email }) => {
  await client.post(`/location/${locationId}/invite`, {
    name,
    email,
  });
};

// 이미 가입된 직원 가입시 정보 불러오기
export const getJoinUserInfo = async (shopId, invitetoken) => {
  const response = await axios.get(
    `${APIURL}/location/${shopId}/${invitetoken}/join`,
  );
  return response;
};

// 이미 가입된 직원 매장 가입 시키기
export const existParttimeSignup = async (shopId, invitetoken) => {
  const response = await axios.post(
    `${APIURL}/location/${shopId}/${invitetoken}/join`,
  );
  return response;
};

// 관리자가 직원 정보 수정할때 사용하는 API
export const patchEmployeeInfoByAdmin = async ({ locationId, _id }, body) => {
  const response = await client.patch(
    `/location/${locationId}/employees/${_id}/update`,
    body,
  );
  return response;
};

// 관리자 본인 정보 수정 API
export const patchAdminInfo = async ({
  name,
  email,
  password,
  newPassword,
}) => {
  const response = await client.patch('/owner/me/update', {
    name,
    email,
    password,
    newPassword,
  });
  return response;
};
