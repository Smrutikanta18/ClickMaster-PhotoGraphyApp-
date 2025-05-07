package com.clickMaster.ClickMaster.service;

import com.clickMaster.ClickMaster.entities.Rate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface RateService {
    Rate addRate(String name, String content1, String content2 , MultipartFile imageFile) throws IOException;
    List<Rate> getAllRates();
    Rate updateRate(int id, String name, String content1, String content2 , MultipartFile imageFile) throws IOException;
    void deleteRate(int id);
}
