const User = require('../models/user');
const { hashPassword } = require('../utils/authUtil');


const createUser = async (userData) => {
    const password_hash = userData.password ? await hashPassword(userData.password) : undefined;
    const user = await User.create({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: password_hash,
        role: userData.role || 'member',
    });
    console.log("in user Create service");
    return user;
}

const updateUser =  async (id, userData) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }
        if (userData.password) {
                userData.password = await hashPassword(userData.password);
        }
        return user.update(userData);
}

const getUserById = async (id) => {
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
        return user;
}

const getAllUsers = async () => {
    return await User.findAll({ attributes: { exclude: ['password'] } });
}


const removeUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }
    await user.destroy();
    return true;
}


module.exports = {
    createUser,
    updateUser,
    getUserById,
    getAllUsers,
    removeUser
};
