const pool = require('../Databases/SQLConn')

class AttractionsDAO{

    constructor(){

    }

    createResponse(success, data = null, error=null){
        return {
            success,
            data,
            error:error?.message || error
        }
    }

    async getAll(){
        try {
            const [rows] =  await pool.query('select * from _attraction_ ')
            if(!rows.length){
                return this.createResponse(false, null, 'No Users')
            }
            return this.createResponse(true, rows)
        } catch (err) {
            console.error(err)
        }
    }

    async create(req){
        const result = await pool.query(' INSERT INTO _attraction_ (_name_, _location_, _desc_) values(?)', [Object.values(req.body)])
        console.log(result.insertId);
        return result.insertId;
    }
}
        

module.exports = AttractionsDAO