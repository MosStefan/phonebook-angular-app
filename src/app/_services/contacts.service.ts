import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'
import { Contact } from '../contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  
  url: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getContactsByUser(id: number): Observable<any> {
    console.log(id);
    let url = this.url + '/contacts/'+ id;
    console.log(url);
    return this.http.get(url);
  }

  getContactByContactId(id: number): Observable<any> {
    console.log(id);
    let url = this.url + '/contact/'+ id;
    console.log(url);
    return this.http.get(url);
  }
  
  deleteContactById(id: number): Observable<any> {
    let url = this.url + '/contacts/'+ id;
    return this.http.delete(url, {responseType: 'text'});
  }

  createOrUpdateContact(contact: Contact, userId: number) {  
    return this.http.post(this.url+'/contacts/'+userId, contact);  
  }

}
