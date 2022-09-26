import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  // const history = useHistory();


// useEffect(() => {
//   const errors = []
//   if (credential.length < 1 ) errors.push("Invalid Email or Username")
//   if (password.length < 1) errors.push("Enter your password")
//   setErrors(errors)
// }, [credential, password])

  const demoLogin = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login({
      credential: "asilvero98@user.io",
      password: "password1"
    }))
  }

  if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
    .catch(
        async (res) => {
          const data = await res.json();
          console.log("data-----", data)
          console.log("data.message-----", data.message)
          console.log("data.errors-----", data.errors)
          // console.log("OBJECT.VAL(data.errors)-----", Object.values(data.errors))

          if (!data.errors && data.message) {
            return setErrors([data.message])
          }
          else if (data && data.errors) {
            return setErrors(Object.values(data.errors))
          }
        }
      );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <div>
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>
      <label>
        <input
          type="text"
          placeholder="Username or email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
      </label>
      <label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" onClick={(e) => handleSubmit(e)}>Log In</button>
      {/* // disabled={errors.length > 0} */}
      <button onClick={demoLogin} className="login-buttons">Demo User</button>

    </form>
  );
}

export default LoginForm;
