package com.clickMaster.ClickMaster.controller;

import com.clickMaster.ClickMaster.entities.Rate;
import com.clickMaster.ClickMaster.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/rates")
@CrossOrigin(origins = "*")
public class RateController {

    @Autowired
    private RateService rateService;

    @PostMapping
    public ResponseEntity<Rate> addRate(
            @RequestParam("name") String name,
            @RequestParam("comment1") String comment1,
            @RequestParam("comment2") String comment2,
            @RequestParam("imageFile") MultipartFile imageFile) throws IOException {
        return ResponseEntity.ok(rateService.addRate(name,comment1,comment2, imageFile));
    }

    @GetMapping
    public ResponseEntity<List<Rate>> getAllRates() {
        return ResponseEntity.ok(rateService.getAllRates());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rate> updateRate(
            @PathVariable int id,
            @RequestParam("name") String name,
            @RequestParam("comment1") String comment1,
            @RequestParam("comment2") String comment2,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {
        return ResponseEntity.ok(rateService.updateRate(id, name, comment1, comment2, imageFile));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRate(@PathVariable int id) {
        rateService.deleteRate(id);
        return ResponseEntity.noContent().build();
    }
}
