import axios from 'axios';
import { APIURL } from 'config';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import jwt from 'jsonwebtoken';
import './EmployeeSignUp.css';
import { TOKENKEY } from 'config';
import { SetUser } from 'modules/user';
import { SetParttime } from 'modules/parttime';
import { withRouter } from 'react-router-dom';
import client from 'utils/api';
import { SetShop } from 'modules/shop';

function EmployeeSignUp({ match }) {
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
    passwordCheck: '',
    cellphone: '',
    birthdate: null,
    gender: '',
    checkbox: false,
  });
  // 밑에거는 form객체의 비구조할당
  const {
    email,
    name,
    password,
    passwordCheck,
    cellphone,
    birthdate,
    gender,
    checkbox,
  } = form;
  // console.log(email);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const parttime = useSelector((state) => state.parttime);
  const history = useHistory();
  const shopId = match.params.shop;

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    // console.log(value, name);
    console.log(e.target.value, e.target.name);
    const nextForm = {
      ...form,
      [name]: value,
    };
    setForm(nextForm);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      name,
      email,
      password,
      birthdate,
      cellphone,
      gender,
    };
    console.log(body);
    axios
      .post(`${APIURL}/employee/${shopId}/signup`, body)
      .then((response) => {
        console.log(response.data);
        const token = response.data.token;
        const decoded = jwt.verify(token, TOKENKEY);
        console.log(decoded);

        let userBody = {
          _id: response.data.employee._id,
          email: response.data.employee.email,
          name: response.data.employee.name,
          role: decoded.role,
          token: response.data.token,
        };

        let parttimeBody = {
          store: response.data.employee.stores,
          birthdate: response.data.employee.birthdate,
          wage: response.data.employee.wage,
          gender: response.data.employee.gender,
          shift: response.data.employee.shifts,
          timeclock: response.data.employee.timeClocks,
          status: response.data.employee.status,
          cellphone: response.data.employee.cellphone,
        };
        dispatch(SetUser(userBody));
        dispatch(SetParttime(parttimeBody));
        localStorage.setItem('parttime', JSON.stringify(parttime));
      })
      .catch(function (error) {
        // status 코드가 200이 아닌경우 처리
        if (error) {
          alert('회원가입에 실패했습니다.');
        }
      });
    // console.log(form);
  };
  useEffect(() => {
    

    if (user.email) {
      console.log('유저가 있습니다');
      history.push('/'); // 홈 화면으로 이동
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('로컬스토리지 저장에 실패했습니다');
      }
    } else {
      console.log('유저가 없습니다');
    }
  }, [history, user]);

  return (
    <div className="EmployeeSignUp">
      <h1>스타벅스점</h1>
      <div className="box-border">
        <form action="#" onSubmit={onSubmitHandler}>
          <div className="form-left-box">
            <div className="input-box">
              <p>이메일</p>
              <input
                type="e-mail"
                value={email}
                onChange={onChangeHandler}
                name="email"
                placeholder="이메일을 입력하세요."
              />
            </div>
            <div className="input-box">
              <p>이름</p>
              <input
                type="text"
                value={name}
                onChange={onChangeHandler}
                name="name"
                placeholder="이름을 입력하세요."
              />
            </div>
            <div className="input-box">
              <p>비밀번호</p>
              <input
                type="password"
                value={password}
                onChange={onChangeHandler}
                name="password"
                placeholder="비밀번호를 입력하세요."
              />
              <p>비밀번호 확인</p>
              <input
                type="password"
                value={passwordCheck}
                onChange={onChangeHandler}
                name="passwordCheck"
                placeholder="비밀번호를 입력하세요."
              />
            </div>
            <div className="input-box">
              <p>핸드폰번호</p>
              <input
                type="number"
                value={cellphone}
                onChange={onChangeHandler}
                name="cellphone"
                placeholder="핸드폰번호를 입력하세욘."
              />
            </div>
            <div className="input-box">
              <label for="gender-select">성별: </label>
              <select
                name="gender"
                id="gender-select"
                value={gender}
                onChange={onChangeHandler}
              >
                <option value="">선택</option>
                <option value="남성">남자</option>
                <option value="여성">여자</option>
              </select>
            </div>
            <div className="input-box">
              <p>생일</p>
              <input
                type="date"
                value={birthdate}
                onChange={onChangeHandler}
                name="birthdate"
                placeholder="2021/01/01"
                onChange={onChangeHandler}
              />
            </div>
            {/* <div className="input-box">
            <label for="position-select">직급: </label>
              <select name="position" id="position-select">
                  <option value="alba">알바생</option>
              </select>
            </div> */}
          </div>
          <div className="right-box">
            <div className="right-top">
              <p>서비스 사용약관</p>
              <div className="contentstext">
                대통령의 임기는 5년으로 하며, 중임할 수 없다. 각급
                선거관리위원회는 선거인명부의 작성등 선거사무와 국민투표사무에
                관하여 관계 행정기관에 필요한 지시를 할 수 있다. 모든 국민은
                법률이 정하는 바에 의하여 납세의 의무를 진다. 모든 국민은 보건에
                관하여 국가의 보호를 받는다. 대통령으로 선거될 수 있는 자는
                국회의원의 피선거권이 있고 선거일 현재 40세에 달하여야 한다.
                비상계엄하의 군사재판은 군인·군무원의 범죄나 군사에 관한
                간첩죄의 경우와 초병·초소·유독음식물공급·포로에 관한 죄중 법률이
                정한 경우에 한하여 단심으로 할 수 있다. 다만, 사형을 선고한
                경우에는 그러하지 아니하다. 대통령은 법률이 정하는 바에 의하여
                훈장 기타의 영전을 수여한다. 의무교육은 무상으로 한다.
                형사피의자 또는 형사피고인으로서 구금되었던 자가 법률이 정하는
                불기소처분을 받거나 무죄판결을 받은 때에는 법률이 정하는 바에
                의하여 국가에 정당한 보상을 청구할 수 있다. 국무총리는
                국무위원의 해임을 대통령에게 건의할 수 있다. 대통령이 제1항의
                기간내에 공포나 재의의 요구를 하지 아니한 때에도 그 법률안은
                법률로서 확정된다. 대통령은 헌법과 법률이 정하는 바에 의하여
                국군을 통수한다. 이 헌법공포 당시의 국회의원의 임기는 제1항에
                의한 국회의 최초의 집회일 전일까지로 한다. 국가안전보장회의의
                조직·직무범위 기타 필요한 사항은 법률로 정한다. 환경권의 내용과
                행사에 관하여는 법률로 정한다. 민주평화통일자문회의의
                조직·직무범위 기타 필요한 사항은 법률로 정한다. 선거에 관한
                경비는 법률이 정하는 경우를 제외하고는 정당 또는 후보자에게
                부담시킬 수 없다. 대통령은 법률이 정하는 바에 의하여 사면·감형
                또는 복권을 명할 수 있다. 국정감사 및 조사에 관한 절차 기타
                필요한 사항은 법률로 정한다. 나는 헌법을 준수하고 국가를
                보위하며 조국의 평화적 통일과 국민의 자유와 복리의 증진 및
                민족문화의 창달에 노력하여 대통령으로서의 직책을 성실히 수행할
                것을 국민 앞에 엄숙히 선서합니다. 선거와 국민투표의 공정한 관리
                및 정당에 관한 사무를 처리하기 위하여 선거관리위원회를 둔다.
                대법원장의 임기는 6년으로 하며, 중임할 수 없다. 정당은 법률이
                정하는 바에 의하여 국가의 보호를 받으며, 국가는 법률이 정하는
                바에 의하여 정당운영에 필요한 자금을 보조할 수 있다. 법관은
                헌법과 법률에 의하여 그 양심에 따라 독립하여 심판한다. 대법원에
                대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌
                법관을 둘 수 있다. 모든 국민은 언론·출판의 자유와 집회·결사의
                자유를 가진다. 모든 국민은 헌법과 법률이 정한 법관에 의하여
                법률에 의한 재판을 받을 권리를 가진다. 대통령이 궐위된 때 또는
                대통령 당선자가 사망하거나 판결 기타의 사유로 그 자격을 상실한
                때에는 60일 이내에 후임자를 선거한다.
              </div>
            </div>
            <div className="right-top">
              <p>개인정보처리방침</p>
              <div className="contentstext">
                대통령의 임기는 5년으로 하며, 중임할 수 없다. 각급
                선거관리위원회는 선거인명부의 작성등 선거사무와 국민투표사무에
                관하여 관계 행정기관에 필요한 지시를 할 수 있다. 모든 국민은
                법률이 정하는 바에 의하여 납세의 의무를 진다. 모든 국민은 보건에
                관하여 국가의 보호를 받는다. 대통령으로 선거될 수 있는 자는
                국회의원의 피선거권이 있고 선거일 현재 40세에 달하여야 한다.
                비상계엄하의 군사재판은 군인·군무원의 범죄나 군사에 관한
                간첩죄의 경우와 초병·초소·유독음식물공급·포로에 관한 죄중 법률이
                정한 경우에 한하여 단심으로 할 수 있다. 다만, 사형을 선고한
                경우에는 그러하지 아니하다. 대통령은 법률이 정하는 바에 의하여
                훈장 기타의 영전을 수여한다. 의무교육은 무상으로 한다.
                형사피의자 또는 형사피고인으로서 구금되었던 자가 법률이 정하는
                불기소처분을 받거나 무죄판결을 받은 때에는 법률이 정하는 바에
                의하여 국가에 정당한 보상을 청구할 수 있다. 국무총리는
                국무위원의 해임을 대통령에게 건의할 수 있다. 대통령이 제1항의
                기간내에 공포나 재의의 요구를 하지 아니한 때에도 그 법률안은
                법률로서 확정된다. 대통령은 헌법과 법률이 정하는 바에 의하여
                국군을 통수한다. 이 헌법공포 당시의 국회의원의 임기는 제1항에
                의한 국회의 최초의 집회일 전일까지로 한다. 국가안전보장회의의
                조직·직무범위 기타 필요한 사항은 법률로 정한다. 환경권의 내용과
                행사에 관하여는 법률로 정한다. 민주평화통일자문회의의
                조직·직무범위 기타 필요한 사항은 법률로 정한다. 선거에 관한
                경비는 법률이 정하는 경우를 제외하고는 정당 또는 후보자에게
                부담시킬 수 없다. 대통령은 법률이 정하는 바에 의하여 사면·감형
                또는 복권을 명할 수 있다. 국정감사 및 조사에 관한 절차 기타
                필요한 사항은 법률로 정한다. 나는 헌법을 준수하고 국가를
                보위하며 조국의 평화적 통일과 국민의 자유와 복리의 증진 및
                민족문화의 창달에 노력하여 대통령으로서의 직책을 성실히 수행할
                것을 국민 앞에 엄숙히 선서합니다. 선거와 국민투표의 공정한 관리
                및 정당에 관한 사무를 처리하기 위하여 선거관리위원회를 둔다.
                대법원장의 임기는 6년으로 하며, 중임할 수 없다. 정당은 법률이
                정하는 바에 의하여 국가의 보호를 받으며, 국가는 법률이 정하는
                바에 의하여 정당운영에 필요한 자금을 보조할 수 있다. 법관은
                헌법과 법률에 의하여 그 양심에 따라 독립하여 심판한다. 대법원에
                대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌
                법관을 둘 수 있다. 모든 국민은 언론·출판의 자유와 집회·결사의
                자유를 가진다. 모든 국민은 헌법과 법률이 정한 법관에 의하여
                법률에 의한 재판을 받을 권리를 가진다. 대통령이 궐위된 때 또는
                대통령 당선자가 사망하거나 판결 기타의 사유로 그 자격을 상실한
                때에는 60일 이내에 후임자를 선거한다.
              </div>
            </div>
            <input
              type="checkbox"
              value={checkbox}
              name="checkbox"
              onChange={onChangeHandler}
            />
            <span>위에 내용에 동의합니다.</span>
            <button type="submit" className="submit-btn">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(EmployeeSignUp);
