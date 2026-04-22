import React, { useContext, useState } from "react";
import { AuthContext } from "../../../components/AuthContext/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../components/firebase/firebase.init";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [email] = useState(user?.email);

  const handleUpdate = (e) => {
    e.preventDefault();

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        alert("Profile updated successfully!");
        setIsEditing(false);
      })
      // .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {/* Show profile image */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="User"
          className="w-28 h-28 rounded-full border"
        />
        <h3 className="text-xl font-semibold">{user?.displayName}</h3>
      </div>

      {/* Profile Info */}
      <p className="mb-2">
        <strong>Email:</strong> {email}
      </p>

      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-neutral mt-4"
        >
          Edit Profile
        </button>
      ) : (
        <form onSubmit={handleUpdate} className="mt-4 space-y-3">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-full">Save Changes</button>

          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="btn btn-outline w-full"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default MyProfile;
