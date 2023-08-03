class AuthenticationException extends Error {
  constructor(public message: string, public errorCode: number) {
    super(message);
    this.name = 'AuthenticationException';
  }
}