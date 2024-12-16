class User {
    constructor(id, username, password, role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.following = [];
        this.score = 0;
    }
}

module.exports = User;