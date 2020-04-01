class Auth {
    constructor() {
        this.authenticatedAsAdmin = false;
        this.authenticatedAsStudent = false;
    }

    loginAsAdmin(cb) {
        this.authenticatedAsAdmin = true;
        cb();
    }

    loginAsStudent(cb) {
        this.authenticatedAsStudent = true;
        cb();
    }

    logout(cb) {
        if  (this.authenticatedAsAdmin)
            this.authenticatedAsAdmin = false;
        if  (this.authenticatedAsStudent)
            this.authenticatedAsStudent = false;
        cb();
    }

    isAuthenticatedAsAdmin() {
        return this.authenticatedAsAdmin;
    }

    isAuthenticatedAsStudent() {
        return this.authenticatedAsStudent;
    }
}

export default new Auth();
