import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import jwt from 'jsonwebtoken';
import './EmployeeSignUp.css';
import { TOKENKEY } from 'config';
import { SetUser } from 'modules/user';
import { SetParttime } from 'modules/parttime';
import { withRouter } from 'react-router-dom';
import { getInviteToken, parttimeRegister } from 'utils/api/user';

function EmployeeSignUp({ match }) {
  const [employeeInfo, setEmployeeInfo] = useState({
    location_name: '',
    user_email: '',
    user_name: '',
  });

  const { location_name, user_email, user_name } = employeeInfo;
  const [checkState, setCheckState] = useState(false);
  const [form, setForm] = useState({
    password: '',
    passwordCheck: '',
    cellphone: '',
    birthdate: null,
    gender: '',
    checkbox: checkState,
  });

  const { password, passwordCheck, cellphone, birthdate, gender, checkbox } =
    form;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const shopId = match.params.shop;

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    const nextForm = {
      ...form,
      [name]: value,
    };
    setForm(nextForm);
  };

  const checkboxToggle = () => {
    setCheckState(!checkState);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await parttimeRegister(
        user_name,
        user_email,
        password,
        birthdate,
        cellphone,
        gender,
        shopId,
      );
      const token = response.data.token;
      const decoded = jwt.verify(token, TOKENKEY);

      let userBody = {
        _id: response.data.employee._id,
        email: response.data.employee.email,
        name: response.data.employee.name,
        role: decoded.role,
        token: response.data.token,
      };

      let parttimeBody = {
        stores: response.data.employee.stores,
        birthdate: response.data.employee.birthdate,
        hourly_wage: response.data.employee.hourly_wage,
        gender: response.data.employee.gender,
        timeClocks: response.data.employee.timeClocks,
        status: response.data.employee.status,
        cellphone: response.data.employee.cellphone,
      };
      dispatch(SetUser(userBody));
      dispatch(SetParttime(parttimeBody));
      sessionStorage.setItem('parttime', JSON.stringify(parttimeBody));
    } catch (e) {
      alert('회원가입에 실패했습니다.');
    }
  };
  useEffect(() => {
    const inviteToken = match.params.invitetoken;
    const getData = async () => {
      try {
        const response = await getInviteToken(shopId, inviteToken);
        const nextForm = {
          ...employeeInfo,
          location_name: response.data.location_name,
          user_email: response.data.user_email,
          user_name: response.data.user_name,
        };
        setEmployeeInfo(nextForm);
      } catch (e) {
        // alert('유효하지 않은 링크입니다.');
        // history.push('/login');
      }
    };
    getData();
    if (user.email) {
      history.push('/');
      try {
        sessionStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('로컬스토리지 저장에 실패했습니다');
      }
    }
  }, [history, user, match.params.invitetoken, shopId]);

  return (
    <div className="EmployeeSignUp">
      <h1>{location_name}</h1>
      <div className="box-border">
        <form action="#" onSubmit={onSubmitHandler}>
          <div className="form-left-box">
            <div className="input-box">
              <p>이메일</p>
              <input
                type="e-mail"
                value={user_email}
                readOnly
                name="email"
                placeholder="이메일을 입력하세요."
              />
            </div>
            <div className="input-box">
              <p>이름</p>
              <input
                type="text"
                value={user_name}
                readOnly
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
              />
            </div>
          </div>
          <div className="right-box">
            <div className="right-top">
              <p>서비스 사용약관</p>
              <div className="contentstext">
                1. 서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한
                연중무휴, 1일 24시간 운영을 원칙으로 합니다. 단, 회사는 시스템
                정기점검, 증설 및 교체를 위해 회사가 정한 날이나 시간에 서비스를
                일시 중단할 수 있으며, 예정되어 있는 작업으로 인한 서비스 일시
                중단은 고도를 통해 사전에 사이트를 통하여 공지합니다. 2. 회사는
                긴급한 시스템 점검, 증설 및 교체, 설비의 장애, 서비스 이용의
                폭주, 국가비상사태, 정전 등 부득이한 사유가 발생한 경우 사전
                예고 없이 일시적으로 서비스의 전부 또는 일부를 중단할 수
                있습니다. 3. 회사는 서비스 개편 등 서비스 운영 상 필요한 경우
                전부 또는 일부 서비스의 제공을 중단할 수 있으며 회원에게 사전
                예고 또는 사후 통보 합니다. 제9조 (회사의 의무) 1. 회사는 본
                약관이 정하는 바에 따라 지속적이고 안정적인 서비스를 제공하기
                위해서 노력합니다. 2. 회사는 회원의 개인정보 보호를 위해 보안
                시스템을 구축하며 개인정보 처리방침을 공시하고 준수합니다. 3.
                회사는 공정하고 건전한 운영을 위해 최선을 다하고 지속적인
                연구개발을 통하여 양질의 서비스를 제공함으로써 고객만족을
                극대화하여 인터넷 사업 발전에 기여합니다. 4. 회사는 회원으로부터
                제기되는 의견이나 불편사항이 정당하다고 객관적으로 인정될
                경우에는 적절한 절차를 통해 즉시 처리하여야 합니다. 다만, 신속한
                처리가 곤란한 경우는 회원에게 그 사유와 처리일정을 통보하여야
                합니다. 제10조 (회원의 의무) 1. 회원은 회원가입 신청 또는
                회원정보 변경 시 모든 사항을 사실에 근거하여 본인의 실제 정보로
                작성하여야 하며, 허위 또는 타인의 정보를 등록할 경우 이와 관련된
                모든 권리를 주장할 수 없습니다. 2. 회원은 본 약관에서 규정하는
                사항과 기타 회사가 정한 제반 규정, 공지사항 등 회사가 공지하는
                사항 및 관계 법령을 준수하여야 하며, 기타 회사의 업무에 방해가
                되는 행위, 회사의 명예를 손상시키는 행위, 타인에게 피해를 주는
                행위를 해서는 안됩니다. 3. 회원은 주소, 연락처, 전자우편 주소 등
                회원의 이용정보가 변경된 경우에 해당 절차를 거쳐 이를 회사에
                즉시 알려야 합니다. 4. 회원은 회원ID, 비밀번호 등이 타인에게
                노출되지 않도록 철저한 관리 책임이 있습니다. 5. 회원은 회원ID,
                비밀번호 등이 도난 당하거나 제 3자가 사용하고 있음을 인지한
                경우에는 즉시 회사에 통보하고 회사의 안내가 있는 경우에는 그에
                따라야 합니다. 6. 회사는 회원의 상기 제1항, 제 2항, 제 3항, 제
                4항, 제 5항을 위반하여 회원에게 발생한 손해에 대하여 어떠한
                책임도 부담하지 않습니다. 제11조 (회원 탈퇴 및 자격 상실) 1.
                회원은 회사에 언제든지 회원 탈퇴를 요청할 수 있으며 회사는
                요청을 받은 즉시 해당 회원의 회원 탈퇴를 위한 절차를 밟아 고도
                개인정보처리방침에 따라 회원 등록을 말소합니다. 2. 회사의 모든
                서비스에서 이용중인 서비스의 기간이 남아있는 회원이 탈퇴
                요청하였을 경우 회원탈퇴로 인한 서비스의 중지 또는 피해는
                회원탈퇴 이용자에게 있습니다. 3. 회원이 서비스 이용에 있어서 본
                약관 제 10조 내용을 위반하거나, 다음 각 호의 사유에 해당하는
                경우 회사는 직권으로 회원자격 상실 및 회원탈퇴의 조치를 할 수
                있습니다. 가. 다른 사람의 명의를 사용하여 가입 신청한 경우 나.
                신청 시 필수 작성 사항을 허위로 기재한 경우 다. 관계법령의
                위반을 목적으로 신청하거나 그러한 행위를 하는 경우 라. 사회의
                안녕질서 또는 미풍양속을 저해할 목적으로 신청하거나 그러한
                행위를 하는 경우 마. 다른 사람의 회사 서비스 이용을 방해하거나
                그 정보를 도용하는 등 전자거래질서를 위협하는 경우 바. 관계 법령
                위배와 본 약관이 금지하는 행위를 하는 회원 경우 4. 회사가
                직권으로 회원탈퇴 처리를 하고자 하는 경우에는 말소 전에 회원에게
                소명의 기회를 부여합니다. 제12조 (휴면ID 관리)
              </div>
            </div>
            <div className="right-top">
              <p>개인정보처리방침</p>
              <div className="contentstext">
                1. 회사는 서비스 미 이용 및 1년 이상 사이트 로그인을 하지 않은
                경우 해당 이용자ID 및 개인정보를 휴면ID로 별도 관리합니다. 2.
                회사는 휴면ID 대상 회원에게 전환 30일 전에 고지의 의무를 다 해야
                하며, 휴면ID를 이용하여 사이트 로그인 시도 시 회원가입 당시
                요청한 제반 정보 확인 후 바로 이용자 ID로 전환이 이루어집니다.
                제13조 (손해배상) 1. 회사는 서비스에서 무료로 제공하는 서비스의
                이용과 관련하여 개인정보보호정책에서 정하는 내용에 해당하지 않는
                사항에 대하여 어떠한 손해도 책임을 지지 않습니다. 제14조
                (면책조항) 1. 회사는 천재지변, 전쟁, 기간통신사업자의 서비스
                중지 및 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수
                없는 경우에는 서비스 제공에 대한 책임 지지 않습니다. 2. 회사는
                서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로
                발생한 손해에 대한 책임이 면제됩니다. 3. 회사는 회원이 서비스에
                게재한 정보, 자료, 사실의 정확성, 신뢰성 등 그 내용에 관하여는
                어떠한 책임을 부담하지 아니하고, 회원은 자기의 책임아래 서비스를
                이용하며, 서비스를 이용하여 게시 또는 전송한 자료 등에 관하여
                손해가 발생하거나 자료의 취사선택, 기타 서비스 이용과 관련하여
                어떠한 불이익이 발생하더라도 이에 대한 모든 책임은 회원에게
                있습니다. 4. 회사가 제공하는 정보와 자료는 거래의 목적으로
                이용될 수 없습니다. 따라서 본 서비스의 정보와 자료 등에 근거한
                거래는 전적으로 회원자신의 책임과 판단아래 수행되는 것이며,
                회사는 회원이 서비스의 이용과 관련하여 기대하는 이익에 관하여
                책임을 부담하지 않습니다. 5. 회사는 회원이 서비스를 이용하여
                기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지
                않으며, 서비스를 이용하면서 얻은 자료로 인한 손해에 대하여
                책임을 지지 않습니다. 6. 회사는 회원의 게시물을 등록 전에
                사전심사 하거나 상시적으로 게시물의 내용을 확인 또는 검토하여야
                할 의무가 없으며, 그 결과에 대한 책임을 지지 아니합니다. 제15조
                (약관의 해석 및 관할법원) 1. 본 약관에 명시되지 않은 사항은 관계
                법령과 상관례에 따릅니다. 2. 회사의 개별 유ㆍ무료 서비스 이용
                회원의 경우 당해 서비스와 관련하여서는 회사가 별도로 정한 약관
                및 정책에 따릅니다. 3. 회원과 회사 사이에 발생한 분쟁에 대해
                소송이 제기되는 경우 관할 법원은 서울중앙지방법원으로 합니다.
                제16조 (재판관할 및 준거법) 1. 이 약관에 명시되지 않은 사항은
                전기통신사업법 등 대한민국의 관계법령과 상관습에 따릅니다. 2.
                회사의 정액 서비스 회원 및 기타 유료 서비스 이용 회원의 경우
                당해 서비스와 관련하여서는 회사가 별도로 정한 약관 및 정책에
                따릅니다. 3. 이 약관 및 서비스의 이용과 관련된 분쟁에 관한
                소송은 회사의 본사 소재지를 관할하는 법원에 제기합니다. 부칙
                (시행일) 본 약관은 2018년 4월 02일부터 적용하고, 2016년 5월
                2일부터 시행되던 종전의 약관은 본 약관으로 대체합니다.
              </div>
            </div>

            <input
              type="checkbox"
              value={checkbox}
              name="checkbox"
              onChange={checkboxToggle}
            />
            <span>위에 내용에 동의합니다.</span>

            <button
              disabled={checkState === false ? true : false}
              style={
                checkState === false
                  ? { backgroundColor: '#999' }
                  : { backgroundColor: 'rgb(41, 75, 230)' }
              }
              type="submit"
              className="submit-btn"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(EmployeeSignUp);
