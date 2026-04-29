import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext/AuthContext';
import { useParams } from 'react-router';
import axios from 'axios';

const UpdateService = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/books/${id}`)
            .then(res => {
                setService(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        const form = e.target;

        const updatedBook = {
            title: form.title.value,
            author: form.author.value,
            genre: form.genre.value,
            rating: form.rating.value,
            summary: form.summary.value,
            coverImage: form.coverImage.value,
            userName: user?.displayName || "",
            userEmail: user?.email || ""
        };

        axios.put(`http://localhost:3000/books/${id}`, updatedBook)
            .then(res => {
                console.log("Updated:", res.data);
                alert("Book updated successfully!");
            })
            .catch(err => console.log(err));
    };

    if (!service) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Update Listing</h2>

            <form onSubmit={handleUpdate} className="space-y-4">

                <div>
                    <label className="label">Title</label>
                    <input
                        name="title"
                        defaultValue={service?.title}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="label">Author</label>
                    <input
                        name="author"
                        defaultValue={service?.author}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="label">Genre</label>
                    <input
                        name="genre"
                        defaultValue={service?.genre}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="label">Rating</label>
                    <input
                        type="number"
                        name="rating"
                        step="0.1"
                        min="0"
                        max="5"
                        defaultValue={service?.rating}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="label">Summary</label>
                    <textarea
                        name="summary"
                        defaultValue={service?.summary}
                        required
                        className="textarea textarea-bordered w-full"
                    />
                </div>

                <div>
                    <label className="label">Cover Image URL</label>
                    <input
                        name="coverImage"
                        defaultValue={service?.coverImage}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="label">User Name</label>
                    <input
                        value={user?.displayName || ""}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                <div>
                    <label className="label">User Email</label>
                    <input
                        value={user?.email || ""}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                <button className="btn btn-primary w-full">
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default UpdateService;