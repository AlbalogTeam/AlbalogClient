import logo from './logo.svg';
import './App.css';
import {Route, Link} from 'react-router-dom';

import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
  return (
    <div className="App">
      <Route path ="/" component={Login} exact/>
      <Route path ="/signup" component={SignUp} />
    </div>
  );
}

export default App;
