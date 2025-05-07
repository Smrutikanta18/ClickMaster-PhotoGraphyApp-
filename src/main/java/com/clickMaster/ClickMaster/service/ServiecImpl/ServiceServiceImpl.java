package com.clickMaster.ClickMaster.service.ServiecImpl;

import com.clickMaster.ClickMaster.entities.ServiceEntity;
import com.clickMaster.ClickMaster.repository.ServiceRepository;
import com.clickMaster.ClickMaster.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
public class ServiceServiceImpl implements ServicesService {

    private static final String UPLOAD_DIR = "static/images";

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public ServiceEntity addService(String name, String description, MultipartFile imageFile) throws IOException {
        ServiceEntity service = new ServiceEntity();
        service.setName(name);
        service.setDescription(description);

        if (!imageFile.isEmpty()) {
            String fileName = imageFile.getOriginalFilename();
            File uploadDir = new ClassPathResource(UPLOAD_DIR).getFile();

            if (!uploadDir.exists()) uploadDir.mkdirs();

            Path path = Paths.get(uploadDir.getAbsolutePath(), fileName);
            Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            service.setImage(fileName);
        }

        return serviceRepository.save(service);
    }

    @Override
    public ServiceEntity updateService(int id, String name, String description, MultipartFile imageFile) throws IOException {
        ServiceEntity service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        service.setName(name);
        service.setDescription(description);

        if (imageFile != null && !imageFile.isEmpty()) {
            File uploadDir = new ClassPathResource(UPLOAD_DIR).getFile();

            // Delete old image
            if (service.getImage() != null) {
                Path oldPath = Paths.get(uploadDir.getAbsolutePath(), service.getImage());
                Files.deleteIfExists(oldPath);
            }

            // Save new image
            String fileName = imageFile.getOriginalFilename();
            Path newPath = Paths.get(uploadDir.getAbsolutePath(), fileName);
            Files.copy(imageFile.getInputStream(), newPath, StandardCopyOption.REPLACE_EXISTING);

            service.setImage(fileName);
        }

        return serviceRepository.save(service);
    }

    @Override
    public void deleteService(int id) {
        serviceRepository.deleteById(id);
    }

    @Override
    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }

    @Override
    public ServiceEntity getServiceById(int id) {
        return serviceRepository.findById(id).orElse(null);
    }
}
