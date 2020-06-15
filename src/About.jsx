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