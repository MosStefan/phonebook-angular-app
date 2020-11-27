export class Contact {
    contactId: number;
    firstName: string;
    lastName: string;
    phone: string;
  
    constructor(contactId: number, firstName: string, lastName: string, phone: string) {
  
      this.contactId = contactId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.phone = phone;
    }
  
  }