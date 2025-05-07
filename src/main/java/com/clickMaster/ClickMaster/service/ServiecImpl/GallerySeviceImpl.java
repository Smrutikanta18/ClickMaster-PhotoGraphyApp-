package com.clickMaster.ClickMaster.service.ServiecImpl;

import com.clickMaster.ClickMaster.entities.Gallery;
import com.clickMaster.ClickMaster.repository.GalleryRepository;
import com.clickMaster.ClickMaster.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class GallerySeviceImpl implements GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;

    private static final String UPLOAD_DIR = "static/images";

    @Override
    public Gallery addGallery(String title, String category, MultipartFile imageFile) throws IOException {
        Gallery gallery = new Gallery();
        gallery.setTitle(title);
        gallery.setCategory(category);
        gallery.setCreatedAt(LocalDateTime.now());


        if (!imageFile.isEmpty()) {
            String fileName = imageFile.getOriginalFilename();
            File uploadDir = new ClassPathResource(UPLOAD_DIR).getFile();
            if (!uploadDir.exists()) uploadDir.mkdirs();

            Path path = Paths.get(uploadDir.getAbsolutePath(), fileName);
            Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            gallery.setImage(fileName);
        }

        return galleryRepository.save(gallery);
    }

    @Override
    public Gallery updateGallery(int id, String title, String category, MultipartFile imageFile) throws IOException {
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gallery not found"));

        gallery.setTitle(title);
        gallery.setCategory(category);
        gallery.setCreatedAt(LocalDateTime.now());


        if (imageFile != null && !imageFile.isEmpty()) {
            File uploadDir = new ClassPathResource(UPLOAD_DIR).getFile();

            if (gallery.getImage() != null) {
                Path oldPath = Paths.get(uploadDir.getAbsolutePath(), gallery.getImage());
                Files.deleteIfExists(oldPath);
            }

            String fileName = imageFile.getOriginalFilename();
            Path newPath = Paths.get(uploadDir.getAbsolutePath(), fileName);
            Files.copy(imageFile.getInputStream(), newPath, StandardCopyOption.REPLACE_EXISTING);

            gallery.setImage(fileName);
        }

        return galleryRepository.save(gallery);
    }

    @Override
    public void deleteGallery(int id) throws IOException {
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gallery not found"));

        if (gallery.getImage() != null) {
            File uploadDir = new ClassPathResource(UPLOAD_DIR).getFile();
            Path path = Paths.get(uploadDir.getAbsolutePath(), gallery.getImage());
            Files.deleteIfExists(path);
        }

        galleryRepository.deleteById(id);
    }

    @Override
    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }

    @Override
    public Gallery getGalleryById(int id) {
        return galleryRepository.findById(id).orElse(null);
    }
}
