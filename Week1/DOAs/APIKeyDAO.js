const pool = require('../Databases/SQLConn')

class APIKeyDAO{
    constructor(){

    }

    createResponse(success, data=null, error=null){
        return {
            success: success, 
            data: data,
            error: error?.message || error
        }
    }

    async create(key, owner){
        try {
            const [result] = await pool.query('INSERT INTO _apikeys_ ( _owner_, _apikey_, _is_active_) values (?,?,?)', [owner, key, 1]);
            return this.createResponse(true, key)
        } catch (err) {
            console.error(err);
        }
    }

    async getKey(key){
        try {
            const [result] = await pool.query('SELECT * FROM _apikeys_ WHERE _apikey_ = ? AND _is_active_ = 1', [key]);
            if(!result.length){
                return this.createResponse(false, 'Invalid key');
            }
            return this.createResponse(true);
        } catch (err) {
            console.error(err)
        }
    }

}

module.exports = APIKeyDAO