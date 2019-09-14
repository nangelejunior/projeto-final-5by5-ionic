import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  authUser(data: any) {
    return this.http.post('http://localhost:3000/users/authenticate', data);
  }

  resetPassword(data: any) {
    return this.http.post('http://localhost:3000/users/password/reset', data);
  }

  createUser(data: any) {
    return this.http.post('http://localhost:3000/users', data);
  }

  getContacts() {
    return this.http.get('http://localhost:3000/contacts');
  }

  getContact(id) {
    return this.http.get(`http://localhost:3000/contacts/${id}`);
  }

  createContact(contact: Contact) {
    return this.http.post('http://localhost:3000/contacts', contact);
  }

  updateContact(contact: Contact) {
    return this.http.put(`http://localhost:3000/contacts/${contact.id}`, contact);
  }

  deleteContact(contact: Contact) {
    return this.http.delete(`http://localhost:3000/contacts/${contact.id}`);
  }

}
