package com.clickMaster.ClickMaster.service.ServiecImpl;

import com.clickMaster.ClickMaster.entities.Rate;
import com.clickMaster.ClickMaster.repository.RateRepository;
import com.clickMaster.ClickMaster.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;


@Service
public class RateServiceImpl implements RateService {

    private static final String UPLOAD_DIR = "static/images";

    @Autowired
    private RateRepository rateRepository;

    @Override
    public Rate addRate(String name, String content1, String content2 , MultipartFile imageFile) throws IOException {
        Rate rate = new Rate();
        rate.setName(name);
        rate.setComment(content1);
        rate.setComment1(content2);
        if (!imageFile.isEmpty()) {
            String fileName = imageFile.getOriginalFilename();
            File uploadDir = new ClassPathResource(UPLOAD_DIR).getFile();

            if (!uploadDir.exists()) uploadDir.mkdirs();

            Path path = Paths.get(uploadDir.getAbsolutePath(), fileName);
            Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            rate.setImage(fileName);
        }
        return rateRepository.save(rate);
    }

    @Override
    public List<Rate> getAllRates() {
        return rateRepository.findAll();
    }

    @Override
    public Rate updateRate(int id,String name, String content1, String content2 , MultipartFile imageFile) throws IOException {
        Rate rate = rateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));
        rate.setName(name);
        rate.setComment1(content1);
        rate.setComment1(content2);

        if (imageFile != null && !imageFile.isEmpty()) {
            File uploadDir = new ClassPathResource(UPLOAD_DIR).getFile();

            // Delete old image
            if (rate.getImage() != null) {
                Path oldPath = Paths.get(uploadDir.getAbsolutePath(), rate.getImage());
                Files.deleteIfExists(oldPath);
            }

            // Save new image
            String fileName = imageFile.getOriginalFilename();
            Path newPath = Paths.get(uploadDir.getAbsolutePath(), fileName);
            Files.copy(imageFile.getInputStream(), newPath, StandardCopyOption.REPLACE_EXISTING);

            rate.setImage(fileName);
        }

            return rateRepository.save(rate);

    }

    @Override
    public void deleteRate(int id) {
        rateRepository.deleteById(id);
    }
}
