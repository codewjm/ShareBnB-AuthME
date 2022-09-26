import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          firstName,
          lastName,
          email,
          username,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors({
      password: "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="signup_error">
        {Object.values(errors).map((error, idx) => (
          <div className="signup_error" key={idx}>{error}</div>
        ))}
      </div>
      <label>
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>

        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="post-review-btn">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;
