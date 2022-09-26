import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

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
      <div className="login_error">
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
      <button type="submit" className="login-btn" onClick={(e) => handleSubmit(e)}>Log In</button>
      {/* // disabled={errors.length > 0} */}
      <button onClick={demoLogin} className="login-buttons demo-user">Demo User</button>

    </form>
  );
}

export default LoginForm;
