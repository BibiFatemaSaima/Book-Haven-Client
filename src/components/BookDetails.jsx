import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://assignment-10-server-gold-delta.vercel.app/books/${id}`);
        setBook(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  //  Handle Order Submit
  const handleOrder = async (e) => {
    e.preventDefault();
    const form = e.target;

    const orderData = {
      bookId: book._id,
      title: book.title,
      name: form.name.value,
      email: form.email.value,
      address: form.address.value,
      phone: form.phone.value,
      quantity: form.quantity.value,
      payment: form.payment.value,
      notes: form.notes.value,
    };

    try {
      const res = await axios.post(
        "https://assignment-10-server-gold-delta.vercel.app/orders",
        orderData
      );

      if (res.data.insertedId) {
        alert("Order placed successfully!");
        form.reset();
        document.getElementById("order_modal").close();
      }
    } catch (error) {
      console.error(error);
      alert("Order failed!");
    }
  };

  if (loading) {
    return <p className="text-center p-10">Loading...</p>;
  }

  if (error || !book) {
    return <p className="text-center p-10">{error || "Book not found"}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card bg-base-100 shadow-md flex flex-col lg:flex-row gap-6">
        {/* Cover Image */}
        <figure className="lg:w-1/3 p-4">
          <img
            src={book.coverImage}
            alt={book.title}
            className="rounded-xl w-full h-full object-cover"
          />
        </figure>

        {/* Book Details */}
        <div className="card-body lg:w-2/3 space-y-3">
          <h2 className="card-title text-3xl font-bold">{book.title}</h2>

          <p>
            <span className="font-semibold">Author:</span> {book.author}
          </p>

          {book.genre && (
            <p>
              <span className="font-semibold">Genre:</span> {book.genre}
            </p>
          )}

          {book.rating && (
            <p>
              <span className="font-semibold">Rating:</span> {book.rating}
            </p>
          )}

          {book.summary && (
            <p className="text-gray-700">
              <span className="font-semibold">Summary:</span> {book.summary}
            </p>
          )}

          {book.userEmail && (
            <p>
              <span className="font-semibold">Added by:</span>{" "}
              {book.userEmail}
            </p>
          )}

          {/* Buttons */}
          <div className="card-actions justify-start mt-4 gap-2">
            {/* Back */}
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline btn-sm"
            >
              Back
            </button>

            {/* Order Button */}
            <button
              onClick={() =>
                document.getElementById("order_modal").showModal()
              }
              className="btn btn-primary btn-sm"
            >
              Order Book
            </button>
          </div>
        </div>
      </div>

      {/*  Modal with Full Form */}
      <dialog id="order_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Order Book</h3>

          <form onSubmit={handleOrder} className="space-y-3">

            {/* Book Title */}
            <input
              type="text"
              value={book.title}
              readOnly
              className="input input-bordered w-full"
            />

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="input input-bordered w-full"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="input input-bordered w-full"
            />

            {/* Address */}
            <input
              type="text"
              name="address"
              placeholder="Delivery Address"
              required
              className="input input-bordered w-full"
            />

            {/* Phone */}
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              className="input input-bordered w-full"
            />

            {/* Quantity */}
            <input
              type="number"
              name="quantity"
              defaultValue={1}
              min="1"
              className="input input-bordered w-full"
            />

            {/* Payment Method */}
            <select
              name="payment"
              className="select select-bordered w-full"
            >
              <option>Cash on Delivery</option>
              <option>Online Payment</option>
            </select>

            {/* Notes */}
            <textarea
              name="notes"
              placeholder="Additional Notes"
              className="textarea textarea-bordered w-full"
            ></textarea>

            {/* Actions */}
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Place Order
              </button>

              <button
                type="button"
                onClick={() =>
                  document.getElementById("order_modal").close()
                }
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default BookDetails;