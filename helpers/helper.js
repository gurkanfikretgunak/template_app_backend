const client = require('../config/redis');

exports.generateCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

exports.checkVerificationCode = async (userId, code) => {
    const key = `code:${userId.toString()}`;
    const storedCode = await client.get(key);
    return storedCode === code;
};
