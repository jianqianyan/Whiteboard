class returnMessage {
  data;
  status;
  message;
  total;
  constructor(data, status, message, total) {
    this.data = data;
    this.status = status;
    this.message = message;
    this.total = total;
  }
}
module.exports = returnMessage;
