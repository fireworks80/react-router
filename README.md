# react router

프로젝트에 라우터를 적용할 때는 *src/index.js* 파일에서 *react-router-dom* 에 내장된 *BrowserRouter*라는 컴포넌트를 사용하여 감싼다.

react-router-dom은 따로 설치해 준다.

````
# index.js

...

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

````

*Route*라는 컴포넌트를 사용해 현재 경료에 따라 다른 컴포넌트를 보여준다.
Route 컴포넌트를 사용하면 어떤 규칙을 가진 경로에 어떤 컴포넌트를 보여 줄지 정의 할 수 있다.

````
<Route path="주소규칙" component={보여줄 컴포넌트} />
````

````
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Route path='/' component={Home} />
      <Route path='/about' component={About} />
    </div>
  );
}

# localhost:3000/about을 하게 되면 home 컴포넌트와 about 컴포넌트가 함께 보인다.
# /about 경로는 / 규칙에도 일치하기 때문에 발생하는 현상

````

위의 오류를 수정하려면 Home Route 컴포넌트를 사용할때 *exact*라는 props를 *true*로 설정 하면 된다.
(exact props에서 exact={true} 대신 exact라고만 써줘도 된다.)

## Link 컴포넌트
클릭하면 다른 주소로 이동시켜 주는 컴포넌트.
일반 웹사이트 에서 a와 비슷하다. 리액트 라우터를 사용할 때는 <a>를 직접 사용하면 안된다.
이 태그는 페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 애플리케이션이 갖고 있는 상태를 모두 날려 버린다. 렌더링 된 컴포넌트들도 모두 사라지고 다시 처음부터 렌더린 된다.

Link컴포넌트는 페이지 전환시 새로 불러오지 않고 HTML5 History API를 사용해 페이지 주소만 변경해 준다.
(Link 자체에 <a>로 구성되어 있지만 페이지 전환방지 기능이 내장되어 있다.)

````
<Link to="주소">내용</Link>
````

## Router 하나에 여러개의 path 설정

````
<Route path={['/about', '/info']} component={About} />
````

*path* props에 배열로 설정해 주면 된다.

````
function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <Route path='/' component={Home} exact />
      <Route path={['/about', '/info']} component={About} />
    </div>
  );
}
````

## URL 파라미터와 쿼리

유동적인 값을 전달할때 사용한다.

- 파라미터 예시: /profile/velopert
- 쿼리 예시: /about?details=true

언제 무얼 써야 하는지 규칙은 없다. 다만 일반적으로 *파라미터*는 특정 *아이디* 혹은 *이름*을 사용해 조회 할경우
쿼리는 어떤 *키워드*를 검색하거나 *페이지에 필요한 옵션*을 전달할 때 사용

### URL 파라미터

URL 파라미터를 사용할 때는 라우트로 사용되는 컴포넌트에서 받아 오는 match라는 캑체 안의 params 값을 참조한다. *match* 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보여지는지에 대한 정보가 들어 있다.

````
const Profile = ({ match }) => {

  console.log(match);

  const {username} = match.params;
  const profile = data[username];

  if (!profile) {
    return <p>존재하지 않는 사용자</p>
  }

  return (
    <>
      <h2>{username} ({profile.name})</h2>
      <p>{profile.description}</p>
    </>
  );
};

--------------------------------------

{path: "/profile/:username", url: "/profile/koko", isExact: true, params: {…}}
isExact: true
params: {username: "koko"}
path: "/profile/:username"
url: "/profile/koko"
__proto__: Object
````

*<Route>* 에서 사용할 path규칙에 /pathname/:파라미터변수명 으로 으로 사용

````
<Link to='/profile/koko'>코코샤넬</Link>

...

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/profile/koko">코코샤넬 프로파일</Link>
        </li>
      </ul>
      <Route path='/' component={Home} exact />
      <Route path={['/about', '/info']} component={About} />
      <Route path='/profile/:username' component={profile} />
    </div>
  );
}
````

### URL 쿼리

쿼리는 location 객체에 들어 있는 search값에서 조회 할 수 있다.
location 객체는 라우트로 사용된 컴포넌트에게 props로 전달되며 웹 어플리케이션의 현재 주소에 대한 정보를 지닌다.

````
# location

http://location:3000/about?detail=true

{
  "pathname": "/about",
  "search" : "?detail=true",
  "hash": ""
}
````

URL 쿼리를 읽을땐 *search* 값을 확인 해야 한다. 이 값은 *문자열*형태로 되어 있다.
URL 쿼리는 ?detail=true&another=1과 같이 여러개를 가질 수 있다.
search 값을 읽어 오기 위해서는 이 문자열을 *객체*형태로 변환 해야 한다.
*qs*라이브러리 이용

````
import React from 'react';
import qs from 'qs';

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true // 문자열 맨 앞의 ?를 생략
  });

  const showDetail = query.detail === 'true'; // 쿼리의 파싱 결과는 문자열
  
  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 기초를 실습해 보는 예제 프로젝트</p>
      {showDetail && <p>detail 값을 true로 설정</p>}
    </div>
  );
};

export default About;
````