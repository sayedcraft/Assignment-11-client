import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const updatedData = {
      title: form.title.value,
      author: form.author.value,
      image: form.image.value,
      price: form.price.value,
      status: form.status.value,
    };

    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/books/update/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Book updated successfully!",
          icon: "success",
          confirmButtonColor: "#003366"
        });
        navigate("/dashboard/myBook"); 
      }
    } catch (error) {
      Swal.fire( "Failed to update book", error);
    }
  };

  if (!book) return <div className="text-center py-10">Loading book</div>;

  return (
    <div className="max-w-2xl mx-auto my-10 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-[#003366] mb-6">Update Book</h2>
      
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="form-control">
          <label className="label"><span className="label-text font-semibold">Book Name</span></label>
          <input type="text" name="title" defaultValue={book.title} required className="input input-bordered w-full" />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-semibold">Author</span></label>
          <input type="text" name="author" defaultValue={book.author} required className="input input-bordered w-full" />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-semibold">Book Image URL</span></label>
          <input type="text" name="image" defaultValue={book.image} required className="input input-bordered w-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Price ($)</span></label>
            <input type="number" name="price" defaultValue={book.price} required className="input input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Status (Dropdown)</span></label>
            <select name="status" defaultValue={book.status || "published"} className="select select-bordered w-full">
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-block bg-sky-500 hover:bg-sky-600 border-none text-white font-bold rounded-xl mt-4">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;