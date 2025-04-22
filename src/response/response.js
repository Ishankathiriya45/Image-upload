class Replay {
    constructor(status, responseCode, success, message, data = null, error = null) {
        this.status = status;
        this.responseCode = responseCode;
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}

module.exports = {
    successResponse: (code, message, data) => {
        return new Replay(200, code, true, message, data, null)
    },

    serverError: (code, message, error) => {
        return new Replay(500, code, false, message, null, error)
    },

    validationError: (code, message, error) => {
        return new Replay(422, code, false, message, null, error)
    },

    notFound: (code, message) => {
        return new Replay(404, code, false, message, null, null)
    },
}