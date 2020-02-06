export  class HttpException extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
      this.message = message;
    }
}


export class UserWithThatEmailAlreadyExistsException extends HttpException
{    
  constructor(status: number, message: string) {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}

export class  WrongCredentialsException extends HttpException{

  constructor(status: number, message: string) {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}

export class PostNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Post with id ${id} not found`);
  }
}