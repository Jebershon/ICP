class AutomationError extends Error {
  constructor(message, plan, personNumber, RequestID, status = 'Failed') {
    super(message);
    this.name = "AutomationError";
    this.plan = plan;
    this.personNumber = personNumber;
    this.RequestID = RequestID;
    this.status = status;
  }
}

module.exports = AutomationError;
