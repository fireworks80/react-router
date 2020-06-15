import React from 'react';

const data = {
  koko: {
    name: '코코',
    description: '코코 사넬의 그 코코'
  },
  gildong: {
    name: '홍길동',
    description: '고전 소설 홍길동전의 주인공'
  }
};

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

export default Profile;