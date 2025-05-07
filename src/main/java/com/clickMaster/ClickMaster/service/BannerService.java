package com.clickMaster.ClickMaster.service;

import com.clickMaster.ClickMaster.entities.Banner;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface BannerService {
    Banner addBanner(String name, String photoBy, MultipartFile imageFile) throws IOException;
    Banner updateBanner(int id, String name, String photoBy, MultipartFile imageFile) throws IOException;
    void deleteBanner(int id);
    List<Banner> getAllBanners();
    Banner getBannerById(int id);
}
