import React, { useEffect, useState } from "react";
import Sidebar from "../../Component/Sidebar/Sidebar";
import "./AdminService.css";
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

function AdminService() {
  const [services, setServices] = useState([]);
  const [modal, setModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", image: null });
  const [deleteId, setDeleteId] = useState(null);

  const toggleModal = () => setModal(!modal);
  const toggleConfirmDelete = () => setConfirmDelete(!confirmDelete);

  const fetchServices = async () => {
    const res = await axios.get("http://localhost:8088/api/services");
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const openEditModal = (service) => {
    setCurrentService(service);
    setFormData({ name: service.name, description: service.description, image: null });
    toggleModal();
  };

  const openDeleteConfirm = (id) => {
    setDeleteId(id);
    toggleConfirmDelete();
  };

  const handleFormSubmit = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.image) data.append("imageFile", formData.image);

    if (currentService) {
        await axios.put(`http://localhost:8088/api/services/${currentService.id}`, data);
    } else {
      await axios.post("http://localhost:8088/api/services", data);
    }

    toggleModal();
    fetchServices();
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8088/api/services/${deleteId}`);
    toggleConfirmDelete();
    fetchServices();
  };

  return (
    <div className="admin-service-container">
      <Sidebar />
      <div className="admin-service-main-content p-4">
        <div className="admin-service-header d-flex justify-content-between align-items-center mb-3">
          <h2>Services</h2>
          <Button color="primary" onClick={() => { setCurrentService(null); setFormData({ name: "", description: "", image: null }); toggleModal(); }}>Add New</Button>
        </div>
  
        <table className="admin-service-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>
                  <img
                    src={`http://localhost:8088/images/${service.image}`}
                    alt={service.name}
                    className="admin-service-image"
                  />
                </td>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>
                  <Button color="warning" onClick={() => openEditModal(service)}>Edit</Button>
                  <Button color="danger" onClick={() => openDeleteConfirm(service.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Modal for Add/Edit */}
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{currentService ? "Edit" : "Add"} Service</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="text" name="description" value={formData.description} onChange={handleInputChange} />
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
  
        {/* Modal for Confirm Delete */}
        <Modal isOpen={confirmDelete} toggle={toggleConfirmDelete}>
          <ModalHeader toggle={toggleConfirmDelete}>Confirm Delete</ModalHeader>
          <ModalBody>Are you sure to delete this service?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDelete}>Delete</Button>{" "}
            <Button color="secondary" onClick={toggleConfirmDelete}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );  
}

export default AdminService;
