package com.clickMaster.ClickMaster.service;

import com.clickMaster.ClickMaster.entities.Contact;

import java.util.List;

public interface ContactService {
    Contact saveContact(Contact contact);
    List<Contact> getAllContactsSortedByCreatedAt();

}
