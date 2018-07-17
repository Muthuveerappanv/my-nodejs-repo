class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);
        var removeIndex = this.users.indexOf(user);
        if(removeIndex > -1)
            this.users.splice(removeIndex, 1);
        return user;
    }

    getUser(id) {
        var users = this.users.filter(user => user.id === id);
        return users[0];
    }

    getUserList(room) {
        var users = this.users.filter(user => user.room === room);
        return users.map(user => user.name);
    }

    getAllUsers() {
        return this.users;
    }

    getSize() {
        return this.users.length;
    }
}

module.exports = { Users };