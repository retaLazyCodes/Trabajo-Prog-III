class User {
    constructor (userId, name, lastname, email, password, userType, image, active) {
        this.userId = userId;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.image = image;
        this.active = active;
    }

    getPublicData () {
        return {
            userId: this.userId,
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            userType: this.userType,
            image: this.image
        };
    }
}

export { User };
