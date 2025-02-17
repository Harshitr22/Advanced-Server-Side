const bcrypt = require('bcrypt');

const generateHash = async (string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(string);
    const hashedPassword = await bcrypt.hash(string, salt);
    return hashedPassword;
}

const verify = async (formPassword, dbPassword) => {
    try {
        const isMatch = await bcrypt.compare(formPassword, dbPassword);
        return isMatch;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {generateHash, verify};