import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext/AuthContext";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const UpdateService = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);

  // 🔹 single book load
  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => setService(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      title: form.title.value,
      author: form.author.value,
      genre: form.genre.value,
      rating: parseFloat(form.rating.value),
      price: parseFloat(form.price.value) || 100,
      summary: form.summary.value,
      coverImage: form.coverImage.value,
      category: form.category.value,
      userName: user?.displayName || "",
      userEmail: user?.email || "",
    };

    console.log(formData);

    axios
      .put(`http://localhost:3000/update/${id}`, formData)
      .then((res) => {
        console.log("Updated:", res.data);

        if (res.data.modifiedCount > 0) {
          alert("Book updated successfully!");
          navigate("/");
        } else {
          alert("No changes detected!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Update failed!");
      });
  };

  if (!service) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">Please login first</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Update Book</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="title"
          defaultValue={service.title}
          className="input w-full"
          required
        />

        <input
          name="author"
          defaultValue={service.author}
          className="input w-full"
          required
        />

        <input
          name="genre"
          defaultValue={service.genre}
          className="input w-full"
          required
        />

        <input
          type="number"
          name="rating"
          step="0.1"
          min="0"
          max="5"
          defaultValue={service.rating}
          className="input w-full"
          required
        />

        <input
          type="number"
          name="price"
          defaultValue={service.price}
          className="input w-full"
        />

        <textarea
          name="summary"
          defaultValue={service.summary}
          className="textarea w-full"
          required
        />

        <input
          name="coverImage"
          defaultValue={service.coverImage}
          className="input w-full"
          required
        />

        <input
          name="category"
          defaultValue={service.category}
          className="input w-full"
        />

        <input
          value={user.displayName || ""}
          readOnly
          className="input w-full"
        />

        <input
          value={user.email || ""}
          readOnly
          className="input w-full"
        />

        <button className="btn btn-primary w-full">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateService;