package com.clickMaster.ClickMaster.controller;

import com.clickMaster.ClickMaster.entities.ServiceEntity;
import com.clickMaster.ClickMaster.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceController {

    @Autowired
    private ServicesService servicesService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ServiceEntity createService(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("imageFile") MultipartFile imageFile
    ) throws IOException {
        return servicesService.addService(name, description, imageFile);
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ServiceEntity updateService(
            @PathVariable int id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile
    ) throws IOException {
        return servicesService.updateService(id, name, description, imageFile);
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable int id) {
        servicesService.deleteService(id);
    }

    @GetMapping
    public List<ServiceEntity> getAllServices() {
        return servicesService.getAllServices();
    }

    @GetMapping("/{id}")
    public ServiceEntity getServiceById(@PathVariable int id) {
        return servicesService.getServiceById(id);
    }
}
