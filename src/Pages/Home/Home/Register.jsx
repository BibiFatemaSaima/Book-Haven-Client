import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../../components/AuthContext/AuthContext";

const Register = () => {
  const { createUser, updateUserProfile, setUser } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;

    createUser(email, password)
      .then((result) => {
        setUser({
          ...result.user,
          photoURL: photo,
          displayName: name,
        });
        updateUserProfile(name, photo)
          .then(() => {
            console.log("User profile updated!");
          })
          // .catch((err) => console.log(err));
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Please Register</h1>

        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Name"
            />

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />

            <label className="label">Profile Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input"
              placeholder="Photo URL"
            />

            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
        </form>

        <p>
          Already have an account?{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
