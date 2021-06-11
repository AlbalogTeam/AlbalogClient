import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Authentication = (Component, option, adminRoute = null) => {
  /** 매개변수 option 의 종류
   * null -> 아무나 출입이 가능한 페이지
   * true -> 로그인한 유저만 출입이 가능한 페이지
   * false -> 로그인한 유저는 출입이 불가능한 페이지
   */

  /** 매개변수 adminRoute 의 종류
   * true -> 관리자만 접근 가능
   * staff -> 직원만 접근 가능
   * null -> 아무나 접근 가능
   */

  function AuthenticationCheck(props) {
    const user = useSelector((state) => state.user);

    useEffect(() => {
      // 로그인 하지 않은 상태
      if (!user.name) {
        if (option) {
          props.history.push('/login');
        }
      } else {
        // 로그인 한 상태
        // 직원체크
        if (adminRoute === 'staff' && user.role !== 'staff') {
          alert('직원만 접근 가능합니다');
          props.history.push('/');
        } else {
          if (option === false) {
            props.history.push('/');
          }
        }
        // 관리자 체크
        if (adminRoute && user.role !== 'owner') {
          alert('관리자만 접근 가능합니다');
          props.history.push('/');
        } else {
          if (option === false) {
            props.history.push('/');
          }
        }
      }
    }, []);
    return <Component />;
  }
  return AuthenticationCheck;
};

export default Authentication;
