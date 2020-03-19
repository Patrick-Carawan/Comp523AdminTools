import React, { useEffect, useState } from "react";

function Home(props) {
  const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   fetch("/users")
  //     .then(res => res.json())
  //     .then(users => setUsers(users));
  // }, []);
  return (
    <div className="App">
      <h1>Welcome to the COMP 523 Admin Tool</h1>
      <h2>Dummy users pulled from static express:</h2>
      {users.map(user => (
        <div key={user.id}>{user.username}</div>
      ))}
    </div>
  );
}

export default Home;
