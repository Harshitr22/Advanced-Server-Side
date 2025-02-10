const APIKeyDAO = require('../DOAs/APIKeyDAO')
const { v4: uuid4 } = require('uuid'); //used to generate unique keys

class APIKeyService{
    constructor(){
        this.apiKeyDao = new APIKeyDAO()
    }

    async create(owner){
        const key = uuid4();
        console.log(key);
        const result = await this.apiKeyDao.create(key, owner);
        return result;
    }
    
    async validate(key){
        const result = await this.apiKeyDao.getKey(key);
        return result;
    }

}

module.exports = APIKeyService;