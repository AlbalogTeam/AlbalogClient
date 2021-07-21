import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { getJoinUserInfo, existParttimeSignup } from 'utils/api/user';

export default function useExistParttimeSignup() {
  const match = useRouteMatch();
  const history = useHistory();
  const shopId = match.params.shop;
  const invitetoken = match.params.invitetoken;
  const [shopName, setShopName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getJoinUserInfo(shopId, invitetoken);
        setShopName(response.data.location_name);
        setUserEmail(response.data.user_email);
      } catch (e) {
        alert('유효하지 않은 링크입니다.');
        history.push('/login');
      }
    };
    getData();
  }, [invitetoken, shopId, history]);

  const onJoin = async () => {
    try {
      await existParttimeSignup(shopId, invitetoken);
      window.location.replace(`/`);
    } catch (e) {
      alert('가입에 실패했습니다.');
    }
  };
  return {
    onJoin,
    shopName,
    userEmail,
  };
}
