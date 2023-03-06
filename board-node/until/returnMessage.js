class returnMessage {
  data;
  status;
  message;
  constructor(data, status, message) {
    this.data = data;
    this.status = status;
    this.message = message;
  }
}
module.exports = returnMessage;
