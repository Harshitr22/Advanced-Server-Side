const pool = require('../Databases/SQLConn');


class UserDAO{

    constructor(){

    }

    createResponse(success, data = null, error=null){
        return {
            success,
            data,
            error:error?.message || error
        }
    }

    async create(req){
        const result = await pool.query('INSERT INTO _users_ (_email_, _password_, _f_name_, _l_name_) values(?)', [Object.values(req.body)]);
        console.log(result.insertId);
        return result;
    }

    async getByEmail(email){
        try {
            const [result] = await pool.query('SELECT * FROM _users_ WHERE _email_ = ?', [email]);
            if(!email){
                return this.createResponse(false, 'Not a registered user');
            }
            return this.createResponse(true, result);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = UserDAO