import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import profile from './Profile';


function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about?detail=true">About</Link>
        </li>
        <li>
          <Link to="/profile/koko">코코샤넬 프로파일</Link>
        </li>
        <li>
          <Link to="/profile/gildong">길동의 프로파일</Link>
        </li>
      </ul>
      <Route path='/' component={Home} exact />
      <Route path={['/about', '/info']} component={About} />
      <Route path='/profile/:username' component={profile} />
    </div>
  );
}

export default App;
