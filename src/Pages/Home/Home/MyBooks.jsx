import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../components/AuthContext/AuthContext";

const MyBooks = () => {
  const [MyBooks, setMyBooks] = useState([]);
  const { user, loading } = useContext(AuthContext);
  // console.log(user);

  useEffect(() => {
    if (loading) return;
    fetch(`http://localhost:3000/my-books?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setMyBooks(data))
      // .catch((err) => console.log(err));
  }, [user?.email]);
  return (
    <div>
      <h2>My Books</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {MyBooks?.map((book) => (
              <tr key={book._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={book?.coverImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{book?.title}</div>
                      <div className="text-sm opacity-50">{book?.author}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <p>{book?.summary}</p>
                </td>
                <td>{book?.userEmail}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default MyBooks;
