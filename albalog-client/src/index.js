import store from 'modules';
import { SetParttime } from 'modules/parttime';
import { SetUser } from 'modules/user';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'styles/main.scss';
import App from './App';

function loadUser() {
  try {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) return; // 로그인 상태가 아니라면 아무것도 안함
    store.dispatch(SetUser(user));

    let parttime = JSON.parse(localStorage.getItem('parttime'));
    console.log(parttime);
    if (!parttime) {
      return;
    }
    store.dispatch(SetParttime(parttime));
  } catch (e) {
    console.log(`loadUser 오류`);
  }
}

loadUser();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
