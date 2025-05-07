package com.clickMaster.ClickMaster.repository;

import com.clickMaster.ClickMaster.entities.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Integer> {
}
