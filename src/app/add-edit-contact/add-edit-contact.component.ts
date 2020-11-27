import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";  
import { ContactsService } from '../_services/contacts.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.css']
})
export class AddEditContactComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private token: TokenStorageService, private router: Router, private contactsService: ContactsService) { }

  addEditForm: FormGroup;
  currentUser: any;
  showAlert: boolean;
  contactId: string;
  errorMessage = '';
  isAddMode: boolean;
  form: any = {};
  submitted = false;



  ngOnInit() {
     this.contactId = window.localStorage.getItem("editContactId");
     console.log(this.contactId);
    this.currentUser = this.token.getUser();
    this.isAddMode = !this.contactId;

    this.resetAllData();

    if(!this.isAddMode) {
      this.contactsService.getContactByContactId(+this.contactId)
      .subscribe( data => {
        console.log(data);
        this.addEditForm.setValue(data);
      });
    }

  }

  onSubmit() {
    this.submitted = true;
    if (this.addEditForm.invalid) {
      return;
  }
      if (this.isAddMode) {
        this.createUser();
    } else {
        this.updateUser();
    }
  }

  private createUser() {
    this.contactsService.createOrUpdateContact(this.addEditForm.value, this.currentUser.id)
    .subscribe( data => {
      this.showAlert = true;
      setTimeout(()=>{                           
        this.resetAllData();
   }, 1000);
      

    },      
    err => {
      this.errorMessage = err.error.message;
    });
  }

  private updateUser() {
    this.contactsService.createOrUpdateContact(this.addEditForm.value, this.currentUser.id)
      .subscribe(
        data => {
          this.showAlert = true;
        setTimeout(()=>{                           
          this.router.navigate(['contacts']);
     }, 1000);
            
         
        },
        err => {
          this.errorMessage = err.error.message;
        });
  }

  resetAllData() {
    this.addEditForm = this.formBuilder.group({
      contactId: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', 
      [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(8)
    ]],
    });
    this.currentUser = this.token.getUser();
    this.showAlert = false;
    this.submitted = false;

  }
  
  backToContactList() {
    this.router.navigate(['contacts']);
  }

  get f() { return this.addEditForm.controls; }


}
