export class HttpException extends Error {
    constructor(status, message) {
        super(message);
    }
}
export class UserWithThatEmailAlreadyExistsException extends HttpException {
    constructor(email) {
        super(404, `user with email ${email} not found`);
    }
}
export class WrongCredentialsException extends HttpException {
    constructor() {
        super(404, `Wrong Password provided`);
    }
}
export class PostNotFoundException extends HttpException {
    constructor(id) {
        super(404, `Post with id ${id} not found`);
    }
}
//# sourceMappingURL=exception.handler.js.map