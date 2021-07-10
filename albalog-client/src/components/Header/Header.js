import Loading from 'components/Loading/Loading';
import InviteModal from 'components/Modal/InviteModal';
import { SetShop } from 'modules/shop';
import { SetUser } from 'modules/user';
import { SetParttime } from 'modules/parttime';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Header.scss';
import logo from 'static/albalog-logo.png';
import client from 'utils/api';
import { FaStoreAlt } from 'react-icons/fa';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { AiOutlineExport } from 'react-icons/ai';

const Header = ({
  user,
  shop,
  parttime,
  dispatchSetParttime,
  dispatchSetUser,
  dispatchSetShop,
  match,
}) => {
  const [isModal, setIsModal] = useState(false);
  console.log('Header 리렌더링');

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const logOutHandler = () => {
    let UserBody = {
      _id: '',
      email: '',
      name: '',
      role: '',
      token: '',
    };
    if (user.role === 'owner') {
      client
        .post('/owner/logout')
        .then((response) => {
          sessionStorage.removeItem('user'); // sessionStorage user를 제거
          dispatchSetUser(UserBody); // user redux를 초기값으로 설정
        })
        .catch(function (error) {
          // status 코드가 200이 아닌경우 처리
          if (error) {
            alert('로그아웃에 실패했습니다.');
          }
        });
    } else if (user.role === 'staff') {
      client
        .post('/employee/logout')
        .then((response) => {
          sessionStorage.removeItem('user'); // localStorage에서 user를 제거
          dispatchSetUser(UserBody); // user redux를 초기값으로 설정
          sessionStorage.removeItem('parttime');
        })
        .catch(function (error) {
          // status 코드가 200이 아닌경우 처리
          if (error) {
            alert('로그아웃에 실패했습니다.');
          }
        });
    }
  };

  useEffect(() => {
    const shopId = match.params.shop;

    if (user.role === 'owner') {
      client.get(`/location/${shopId}`).then((response) => {
        console.log(response.data);
        let shopBody = response.data;

        dispatchSetShop(shopBody);
      });
    } else if (user.role === 'staff') {
      client.get(`/employee/${shopId}`).then((response) => {
        console.log(response.data);

        let shopBody = {
          _id: response.data._id,
          name: response.data.name,
          notices: [...response.data.notices].reverse(),
          workManuals: response.data.workManuals,
          address: response.data.address,
          phone_number: response.data.phone_number,
          postal_code: response.data.postal_code,
          employees: response.data.employees,
        };

        dispatchSetShop(shopBody);
      });
    }

    if (!user.email) {
      window.location.replace('/login');
    }
  }, [user, dispatchSetShop, match.params.shop]);

  // payroll과 개인스케줄을 리덕스에 추가
  useEffect(() => {
    const getPayroll = async () => {
      try {
        let responseP = await client.get(`/timeclock/${shop._id}/staff`);
        const responseOneSht = await client.get(`/shift/employee/${user._id}`);

        let shift = await responseOneSht.data.map((a) => {
          const st = new Date(new Date(a.start).getTime() - 540 * 60 * 1000);
          const ed = new Date(new Date(a.end).getTime() - 540 * 60 * 1000);

          let newData = {
            title: user.name,
            start: new Date(st),
            end: new Date(ed),
          };
          return newData;
        });
        const shiftParttime = {
          ...parttime,
          payrolls: responseP.data,
          one_shift: shift,
        };
        console.log(shiftParttime);
        sessionStorage.setItem('parttime', JSON.stringify(shiftParttime));
        dispatchSetParttime(shiftParttime);
      } catch (error) {
        console.log('payroll', error);
      }
    };

    if (shop._id && user.role === 'staff') {
      getPayroll();
    }
  }, [shop._id]);

  return (
    <>
      {!shop._id && <Loading />}
      <header className="header">
        <a href="/">
          <img src={logo} alt="" />
        </a>

        <h3 className="header-middle">
          <FaStoreAlt size="24" />
          <span>{shop.name}</span>
        </h3>
        <div className="header-right">
          <span className="user-name">
            <b>{user.name}</b>님 안녕하세요.
          </span>
          {user.role === 'owner' ? (
            <button className="btn-invite" onClick={handleModal}>
              <span>직원초대</span>
              <BsFillPersonPlusFill size="25" />
            </button>
          ) : (
            ''
          )}

          <button className="btn-logout" onClick={logOutHandler}>
            <span>로그아웃</span>
            <AiOutlineExport size="25" />
          </button>
        </div>
      </header>
      {isModal && <InviteModal handleModal={handleModal} />}
    </>
  );
};

function mapStateToProps(state) {
  // redux state로 부터 state를 component의 props로 전달해줌
  // store의 값이 여기 함수 state로 들어옴
  return { user: state.user, shop: state.shop, parttime: state.parttime };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchSetUser: (UserBody) => dispatch(SetUser(UserBody)),
    dispatchSetShop: (ShopBody) => dispatch(SetShop(ShopBody)),
    dispatchSetParttime: (ParttimeBody) => dispatch(SetParttime(ParttimeBody)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
