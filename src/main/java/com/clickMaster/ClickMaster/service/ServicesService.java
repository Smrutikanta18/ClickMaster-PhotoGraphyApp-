package com.clickMaster.ClickMaster.service;

import com.clickMaster.ClickMaster.entities.ServiceEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ServicesService {
    ServiceEntity addService(String name, String description, MultipartFile imageFile) throws IOException;
    ServiceEntity updateService(int id, String name, String description, MultipartFile imageFile) throws IOException;    void deleteService(int id);
    List<ServiceEntity> getAllServices();
    ServiceEntity getServiceById(int id);
}
