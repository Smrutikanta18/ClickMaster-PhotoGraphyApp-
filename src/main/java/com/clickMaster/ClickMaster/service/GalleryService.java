package com.clickMaster.ClickMaster.service;

import com.clickMaster.ClickMaster.entities.Gallery;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface GalleryService {
    Gallery addGallery(String title, String category, MultipartFile imageFile) throws IOException;
    Gallery updateGallery(int id, String title, String category, MultipartFile imageFile) throws IOException;
    void deleteGallery(int id) throws IOException;
    List<Gallery> getAllGalleries();
    Gallery getGalleryById(int id);
}
