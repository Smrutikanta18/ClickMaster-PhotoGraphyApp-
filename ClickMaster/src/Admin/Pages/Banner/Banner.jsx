import React, { useEffect, useState } from "react";
import Sidebar from "../../Component/Sidebar/Sidebar";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "./Banner.css";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [modal, setModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [formData, setFormData] = useState({ name: "", photoBy: "", image: null });
  const [deleteId, setDeleteId] = useState(null);

  const toggleModal = () => setModal(!modal);
  const toggleConfirmDelete = () => setConfirmDelete(!confirmDelete);

  const fetchBanners = async () => {
    const res = await axios.get("http://localhost:8088/api/banners");
    setBanners(res.data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const openEditModal = (banner) => {
    setCurrentBanner(banner);
    setFormData({ name: banner.name, photoBy: banner.photoBy, image: null });
    toggleModal();
  };

  const openDeleteConfirm = (id) => {
    setDeleteId(id);
    toggleConfirmDelete();
  };

  const handleFormSubmit = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("photoBy", formData.photoBy);
    if (formData.image) data.append("imageFile", formData.image);

    if (currentBanner) {
      await axios.put(`http://localhost:8088/api/banners/${currentBanner.id}`, data);
    } else {
      await axios.post("http://localhost:8088/api/banners", data);
    }

    toggleModal();
    fetchBanners();
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8088/api/banners/${deleteId}`);
    toggleConfirmDelete();
    fetchBanners();
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="banner-heading">Banners</h2>
          <Button color="primary" onClick={() => { setCurrentBanner(null); setFormData({ name: "", photoBy: "", image: null }); toggleModal(); }}>Add New</Button>
        </div>

        <table className="banner-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Photo By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner.id}>
                <td>
                  <img
                    src={`http://localhost:8088/images/${banner.image}`}
                    alt={banner.name}
                    className="banner-image"
                  />
                </td>
                <td>{banner.name}</td>
                <td>{banner.photoBy}</td>
                <td>
                  <Button color="warning" onClick={() => openEditModal(banner)}>Edit</Button>{" "}
                  <Button color="danger" onClick={() => openDeleteConfirm(banner.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{currentBanner ? "Edit" : "Add"} Banner</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="photoBy">Photo By</Label>
                <Input type="text" name="photoBy" value={formData.photoBy} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="image">Image</Label>
                <Input type="file" name="image" onChange={handleInputChange} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleFormSubmit}>Save</Button>{" "}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={confirmDelete} toggle={toggleConfirmDelete}>
          <ModalHeader toggle={toggleConfirmDelete}>Confirm Delete</ModalHeader>
          <ModalBody>Are you sure you want to delete this banner?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDelete}>Delete</Button>{" "}
            <Button color="secondary" onClick={toggleConfirmDelete}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
