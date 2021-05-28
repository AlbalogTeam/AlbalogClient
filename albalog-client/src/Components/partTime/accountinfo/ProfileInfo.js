import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import 'components/partTime/accountinfo/ProfileInfo.scss';

function ProfileInfo({ props }) {
  const [name, setName] = useState();
  const [typedName, setTypedName] = useState();
  const [password, setPassword] = useState();
  const [typedPassword, setTypedPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeName = () => {
    setName(typedName);
  };

  const changePassword = () => {
    setPassword(typedPassword);
  };

  useEffect(() => {
    //   axios
    //     .get('https://jsonplaceholder.typicode.com/posts/')
    //     .then((response) => response.data)
    //     .then((data) => {
    //       console.log(data);
    //       setSamples(data);
    //     });
    // }, []);

    const getAccount = async () => {
      try {
        setError(null);
        // setSamples(null);
        setLoading(true);
        let response = await axios.get(
          'https://jsonplaceholder.typicode.com/user',
        );
        console.log(response.data);
        setSamples(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    getAccount();
  }, [name, password]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다 {console.log(error)}</div>;
  if (!account) return <div>{console.log(account)}</div>;

  return (
    <div id="ProfileInfo">
      <div className="tr">
        <div className="head">이름</div>
        <input
          className="content name"
          placeholder="유저이름"
          onChange={(e) => {
            setTypedName(e.target.value);
          }}
        />
        <button>
          <MdEdit onClick={changeName(typedName)} />
        </button>
      </div>
      <div className="tr">
        <div className="head">아이디</div>
        <div className="content">userid1</div>
      </div>
      <div className="tr">
        <div className="head">비밀번호</div>
        <input
          type="password"
          className="content password"
          placeholder="userid1"
        />
      </div>
      <div className="tr">
        <div className="head">비밀번호 확인</div>
        <input
          type="password"
          className="content password-confirm"
          placeholder="userid1"
          onChange={(e) => {
            setTypedPassword(e.target.value);
          }}
        />
        <button>
          <MdEdit onClick={changePassword} />
        </button>
      </div>
      <div className="tr">
        <div className="head">성별</div>
        <div className="content">남자</div>
      </div>
      <div className="tr">
        <div className="head">생년월일</div>
        <div className="content">2021/06/18</div>
      </div>
      <div className="tr">
        <div className="head">직급</div>
        <div className="content">아르바이트</div>
      </div>
    </div>
  );
}

export default ProfileInfo;
