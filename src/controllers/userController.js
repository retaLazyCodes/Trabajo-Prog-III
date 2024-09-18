const getUsers = async (req, res) => {
    const users = [
        { name: 'test1', email: 'test1@test.com' },
        { name: 'test2', email: 'test2@test.com' }
    ];
    res.status(200).json(users);
};

const createUser = async (req, res) => {
    res.status(201).json(req.body);
};

const updateUser = async (req, res) => {
    res.status(200).json(req.body);
};

export { getUsers, createUser, updateUser };
