import { useState } from 'react';
import { useSelector } from 'react-redux';
import { patchEmployeeInfoByAdmin } from 'utils/api/user';

export default function useEmployeeInfo(data) {
  const {
    _id,
    name,
    email,
    birthdate,
    cellphone,
    gender,
    status,
    hourly_wage,
  } = data;

  const [wage, setWage] = useState(hourly_wage);
  const [isStatus, setIsStatus] = useState(status);
  const locationId = useSelector(({ shop }) => shop._id);
  const shop = useSelector((state) => state.shop);

  const changeWage = (e) => {
    setWage(e.target.value);
  };

  const changeStatus = (e) => {
    setIsStatus(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        hourly_wage: Number(wage),
        status: isStatus,
      };
      const response = await patchEmployeeInfoByAdmin(
        { locationId, _id },
        requestBody,
      );
      alert('변경성공');
      if (response.status === 200) {
        window.location.replace(`/admin/${shop._id}/employeelist`); // 페이지 이동 후 새로고침
      }
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    _id,
    name,
    email,
    birthdate,
    cellphone,
    gender,
    status,
    hourly_wage,
    isStatus,
    wage,
    changeStatus,
    changeWage,
    onSubmit,
  };
}
