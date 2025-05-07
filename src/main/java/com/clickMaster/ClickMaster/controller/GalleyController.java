package com.clickMaster.ClickMaster.controller;

import com.clickMaster.ClickMaster.entities.Gallery;
import com.clickMaster.ClickMaster.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@CrossOrigin(origins = "*")

public class GalleyController {

    @Autowired
    private GalleryService galleryService;

    @PostMapping("/add")
    public ResponseEntity<Gallery> addGallery(@RequestParam String title,
                                              @RequestParam String category,
                                              @RequestParam("image") MultipartFile imageFile) throws IOException {
        return ResponseEntity.ok(galleryService.addGallery(title, category, imageFile));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Gallery> updateGallery(@PathVariable int id,
                                                 @RequestParam String title,
                                                 @RequestParam String category,
                                                 @RequestParam(value = "image", required = false) MultipartFile imageFile) throws IOException {
        return ResponseEntity.ok(galleryService.updateGallery(id, title, category, imageFile));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable int id) throws IOException {
        galleryService.deleteGallery(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<Gallery>> getAllGalleries() {
        return ResponseEntity.ok(galleryService.getAllGalleries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Gallery> getGalleryById(@PathVariable int id) {
        return ResponseEntity.ok(galleryService.getGalleryById(id));
    }
}
