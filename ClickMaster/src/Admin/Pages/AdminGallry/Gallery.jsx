import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../Component/Sidebar/Sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Gallery.css';

function Gallery() {
  const [galleries, setGalleries] = useState([]);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: null
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await axios.get('http://localhost:8088/api/gallery/all');
      // Ensure response is an array
      if (Array.isArray(res.data)) {
        setGalleries(res.data);
      } else {
        setGalleries([]); // fallback to an empty array
        console.error("Unexpected response format:", res.data);
      }
    } catch (err) {
      console.error("Failed to fetch galleries:", err);
      setGalleries([]); // fallback on error
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAdd = () => {
    setModalType('add');
    setFormData({ title: '', category: '', image: null });
    setShowModal(true);
  };

  const handleEdit = (gallery) => {
    setModalType('edit');
    setSelectedGallery(gallery);
    setFormData({
      title: gallery.title,
      category: gallery.category,
      image: null
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8088/api/gallery/delete/${id}`);
    fetchGalleries();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    if (formData.image) data.append('image', formData.image);

    if (modalType === 'add') {
      await axios.post('http://localhost:8088/api/gallery/add', data);
    } else if (modalType === 'edit') {
      await axios.put(`http://localhost:8088/api/gallery/update/${selectedGallery.id}`, data);
    }

    setShowModal(false);
    fetchGalleries();
  };

  return (
<div className="gallery-container">
  <Sidebar />
  <div className="gallery-main">
    <div className="gallery-header">
      <h2>Gallery Management</h2>
      <button onClick={handleAdd} className="gallery-add-btn">Add New</button>
    </div>

    <table className="gallery-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {galleries.map((g) => (
          <tr key={g.id}>
            <td>{g.title}</td>
            <td>{g.category}</td>
            <td>
              <img src={`http://localhost:8088/images/${g.image}`} alt="" className="gallery-img" />
            </td>
            <td>
              <button onClick={() => handleEdit(g)} className="gallery-edit-btn"><FaEdit /></button>
              <button onClick={() => handleDelete(g.id)} className="gallery-delete-btn"><FaTrash /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {showModal && (
      <div className="gallery-modal-backdrop">
        <div className="gallery-modal">
          <h2>{modalType === 'add' ? 'Add New' : 'Edit'} Gallery</h2>
          <form onSubmit={handleSubmit}>
            <div className="gallery-form-group">
              <label>Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div className="gallery-form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange} required>
                <option value="">Select</option>
                <option value="photo_a">Wedding</option>
                <option value="photo_b">Models</option>
                <option value="photo_c">Fashions</option>
              </select>
            </div>
            <div className="gallery-form-group">
              <label>Image</label>
              <input type="file" name="image" accept="image/*" onChange={handleInputChange} required={modalType === 'add'} />
            </div>
            <div className="gallery-form-actions">
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit">{modalType === 'add' ? 'Add' : 'Update'}</button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
</div>
  );
}

export default Gallery;
