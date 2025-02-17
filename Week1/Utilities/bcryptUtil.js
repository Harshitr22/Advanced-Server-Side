const bcrypt = require('bcrypt');

const generateHash = async (string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(string, salt);
    return hashedPassword;
}

module.exports = {generateHash};