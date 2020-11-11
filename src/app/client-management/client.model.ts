class ContactInformation {
  constructor(
    public email?: string,
    public phone_number?: string,
    public address?: string
  ) {
  }
}

export class Client {
  constructor(
    public name?: string,
    public nameAr?: string,
    public id?: string,
    public contactInfo: ContactInformation = new ContactInformation(),
    public createdBy?: string,
    public createdDate?: string,
    public enabled?: boolean,
    public properties?: any
  ) {
  }
}
