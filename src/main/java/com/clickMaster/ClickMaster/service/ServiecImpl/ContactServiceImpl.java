package com.clickMaster.ClickMaster.service.ServiecImpl;

import com.clickMaster.ClickMaster.entities.Contact;
import com.clickMaster.ClickMaster.repository.ContactRepository;
import com.clickMaster.ClickMaster.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public Contact saveContact(Contact contact) {
        contact.setCreatedAt(LocalDateTime.now());
        return contactRepository.save(contact);
    }

    @Override
    public List<Contact> getAllContactsSortedByCreatedAt() {
        return contactRepository.findAllByOrderByCreatedAtDesc();
    }

}
