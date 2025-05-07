package com.clickMaster.ClickMaster.service.ServiecImpl;

import com.clickMaster.ClickMaster.entities.Banner;
import com.clickMaster.ClickMaster.repository.BannerRepository;
import com.clickMaster.ClickMaster.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
public class BannerServiceImpl implements BannerService {

    @Autowired
    private BannerRepository bannerRepository;

    private final String UPLOAD_DIR = "static/images";


    @Override
    public Banner addBanner(String name, String photoBy, MultipartFile imageFile) throws IOException {
        Banner banner = new Banner();
        banner.setName(name);
        banner.setPhotoBy(photoBy);

        if (!imageFile.isEmpty()) {
            String fileName = imageFile.getOriginalFilename();
            File uploadDir = new ClassPathResource(UPLOAD_DIR).getFile();
            if (!uploadDir.exists()) uploadDir.mkdirs();

            Path path = Paths.get(uploadDir.getAbsolutePath(), fileName);
            Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            banner.setImage(fileName);
        }

        return bannerRepository.save(banner);
    }

    @Override
    public Banner updateBanner(int id, String name, String photoBy, MultipartFile imageFile) throws IOException {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Banner not found"));

        banner.setName(name);
        banner.setPhotoBy(photoBy);

        if (imageFile != null && !imageFile.isEmpty()) {
            File uploadDir = new ClassPathResource(UPLOAD_DIR).getFile();

            if (banner.getImage() != null) {
                Path oldPath = Paths.get(uploadDir.getAbsolutePath(), banner.getImage());
                Files.deleteIfExists(oldPath);
            }

            String fileName = imageFile.getOriginalFilename();
            Path newPath = Paths.get(uploadDir.getAbsolutePath(), fileName);
            Files.copy(imageFile.getInputStream(), newPath, StandardCopyOption.REPLACE_EXISTING);

            banner.setImage(fileName);
        }

        return bannerRepository.save(banner);
    }

    @Override
    public void deleteBanner(int id) {
        bannerRepository.deleteById(id);
    }

    @Override
    public List<Banner> getAllBanners() {
        return bannerRepository.findAll();
    }

    @Override
    public Banner getBannerById(int id) {
        return bannerRepository.findById(id).orElse(null);
    }
}
