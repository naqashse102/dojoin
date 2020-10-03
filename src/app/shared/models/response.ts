export class Response {
    result: any;
    errorMessage: string;
    paging: any;
    serverTime: Date;
    constructor(response: any = {}) {
      this.result = response.result;
      this.errorMessage = response.errorMessage || '';
      this.paging = response.paging || '';
      this.serverTime = response.serverTime || '';
    }
  }
  