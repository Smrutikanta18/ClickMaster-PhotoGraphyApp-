package com.clickMaster.ClickMaster.controller;

import com.clickMaster.ClickMaster.entities.Banner;
import com.clickMaster.ClickMaster.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/banners")
@CrossOrigin(origins = "*")
public class BannerController {

    @Autowired
    private BannerService bannerService;

    @PostMapping(consumes = {"multipart/form-data"})
    public Banner createBanner(
            @RequestParam("name") String name,
            @RequestParam("photoBy") String photoBy,
            @RequestParam("imageFile") MultipartFile imageFile
    ) throws IOException {
        return bannerService.addBanner(name, photoBy, imageFile);
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public Banner updateBanner(
            @PathVariable int id,
            @RequestParam("name") String name,
            @RequestParam("photoBy") String photoBy,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile
    ) throws IOException {
        return bannerService.updateBanner(id, name, photoBy, imageFile);
    }

    @DeleteMapping("/{id}")
    public void deleteBanner(@PathVariable int id) {
        bannerService.deleteBanner(id);
    }

    @GetMapping
    public List<Banner> getAllBanners() {
        return bannerService.getAllBanners();
    }

    @GetMapping("/{id}")
    public Banner getBannerById(@PathVariable int id) {
        return bannerService.getBannerById(id);
    }
}
