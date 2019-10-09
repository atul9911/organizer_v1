function MyError(message,code) {
    this.name = 'MyError';
    this.message = message;
    this.stack = (new Error()).stack;
    this.status = code
}
MyError.prototype = new Error; 

module.exports={
    MyError
}