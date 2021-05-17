import React from 'react';
import './Login.scss';

function Login() {
    return (
    <div>
       <div className="loginLeft">
           <input type="text" placeholder="username"/>
           <input type="password" placeholder="password"/>
           <button className="signIn">로그인</button>
           <button className="signUp">회원가입</button>
       </div>
       <div className="loginRight">
           <span>Albalog</span>
        </div>
    </div>
    );
}

export default Login;