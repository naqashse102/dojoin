export class Country {
    id: string;
    name: string;
    phoneCode: string;
    countryCode: string;
    constructor(country: any = {}) {
      this.id = country.id;
      this.name = country.name || '';
      this.phoneCode = country.phoneCode || '';
      this.countryCode = country.countryCode || '';
    }
  }
  