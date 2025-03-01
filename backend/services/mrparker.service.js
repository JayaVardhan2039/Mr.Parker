const MrParkerModel = require('../models/mrparker.model');

module.exports.createMrParker = async ({
    firstname, lastname, email, password, phonenumber
}) => {
    if (!firstname || !email || !password || !phonenumber) {
        throw new Error('All fields are required');
    }
    const MrParker = MrParkerModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
        phonenumber
    });
    return MrParker;
}