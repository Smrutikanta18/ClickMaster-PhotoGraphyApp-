import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Testimonial.css';
import Sidebar from '../../Component/Sidebar/Sidebar';

function Testimonial() {
  const [rates, setRates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRate, setEditingRate] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    comment1: '',
    comment2: '',
    imageFile: null
  });

  const fetchRates = async () => {
    try {
      const res = await axios.get('http://localhost:8088/api/rates');
      setRates(res.data);
    } catch (err) {
      console.error('Failed to fetch rates:', err);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('comment1', formData.comment1);
    data.append('comment2', formData.comment2);
    if (formData.imageFile) data.append('imageFile', formData.imageFile);

    try {
      if (editingRate) {
        await axios.put(`http://localhost:8088/api/rates/${editingRate.id}`, data);
      } else {
        await axios.post('http://localhost:8088/api/rates', data);
      }
      setShowModal(false);
      setEditingRate(null);
      fetchRates();
    } catch (err) {
      console.error('Failed to submit rate:', err);
    }
  };

  const openEditModal = (rate) => {
    setEditingRate(rate);
    setFormData({
      name: rate.name,
      comment1: rate.comment,
      comment2: rate.comment1,
      imageFile: rate.image
    });
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8088/api/rates/${deleteId}`);
      setShowConfirm(false);
      fetchRates();
    } catch (err) {
      console.error('Failed to delete rate:', err);
    }
  };

  return (
    <div className="admin-service-container">
      <Sidebar />
      <div className="testimonial-content p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Testimonials</h2>
          <button
            onClick={() => {
              setShowModal(true);
              setEditingRate(null);
              setFormData({ name: '', comment1: '', comment2: '', imageFile: null });
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add New
          </button>
        </div>

        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Comment 1</th>
              <th className="px-4 py-2 text-left">Comment 2</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.id} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={`http://localhost:8088/images/${rate.image}`}
                    alt={rate.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-2">{rate.name}</td>
                <td className="px-4 py-2">{rate.comment}</td>
                <td className="px-4 py-2">{rate.comment1}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => openEditModal(rate)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mb-2"
                  >
                    Edit
                  </button>
                  
                  <button
                    onClick={() => {
                      setDeleteId(rate.id);
                      setShowConfirm(true);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
  <div className="testimonial-modal-backdrop">
    <div className="testimonial-modal">
      <div className="testimonial-modal-header">
        {editingRate ? 'Edit Testimonial' : 'Add Testimonial'}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="testimonial-modal-body">
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Comment 1"
              className="form-control"
              value={formData.comment1}
              onChange={(e) =>
                setFormData({ ...formData, comment1: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Comment 2"
              className="form-control"
              value={formData.comment2}
              onChange={(e) =>
                setFormData({ ...formData, comment2: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                setFormData({ ...formData, imageFile: e.target.files[0] })
              }
            />
          </div>
        </div>
        <div className="testimonial-modal-footer">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="btn btn-warning"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {editingRate ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{showConfirm && (
  <div className="testimonial-modal-backdrop">
    <div className="testimonial-modal w-96">
      <div className="testimonial-modal-header">
        Confirm Delete
      </div>
      <div className="testimonial-modal-body">
        <p className="text-gray-700 text-base mb-4">
          Are you sure you want to delete this testimonial?
        </p>
      </div>
      <div className="testimonial-modal-footer">
        <button
          onClick={() => setShowConfirm(false)}
          className="btn btn-warning"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}


      </div>
    </div>
  );
}

export default Testimonial;
