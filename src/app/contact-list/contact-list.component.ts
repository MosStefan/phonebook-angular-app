import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import { ContactsService } from '../_services/contacts.service';
import { Contact } from '../contact';
import { Router } from "@angular/router";  




@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  currentUser: any;
  contactlist: Contact[];

  constructor(private token: TokenStorageService,private router: Router, private contactService: ContactsService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.getContactsByUser();
  }

 private getContactsByUser() {
    this.contactService.getContactsByUser(this.currentUser.id).
    subscribe(data => {
      this.contactlist = data;
      console.log(data);
    });
  }
  deleteContactById(contactId: number) {
    this.contactService.deleteContactById(contactId).
    subscribe(data => {
      this.contactlist = this.contactlist.filter(u => u.contactId !== contactId);  

      console.log(this.contactlist);
    });
  }

  editContact(contact: Contact): void {  
    localStorage.removeItem('editContactId');  
    localStorage.setItem('editContactId', contact.contactId.toString());  
    this.router.navigate(['edit-contact']);  
  } 

  addContact(): void {
    localStorage.removeItem('editContactId');  
    this.router.navigate(['add-contact']);
  };

}
