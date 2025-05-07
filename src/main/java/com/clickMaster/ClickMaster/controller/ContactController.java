package com.clickMaster.ClickMaster.controller;

import com.clickMaster.ClickMaster.entities.Contact;
import com.clickMaster.ClickMaster.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/save")
    public Contact saveContact(@RequestBody Contact contact) {
        return contactService.saveContact(contact);
    }
    @GetMapping("/all")
    public List<Contact> getAllContactsSorted() {
        return contactService.getAllContactsSortedByCreatedAt();
    }

}
