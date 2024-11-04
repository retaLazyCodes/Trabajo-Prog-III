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
            userRole: getRoleNames(this.userType),
            image: this.image
        };
    }
}

const getRoleNames = (userType) => {
    switch (userType) {
    case 1:
        return 'admin';
    case 2:
        return 'employee';
    case 3:
        return 'client';
    }
};

export { User };
