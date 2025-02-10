const APIKeyService = require('../Services/APIKeyService');

const apiValidation = async (req, res, next) =>{

    const key = req.header('X-API-Key');
    if(!key){
        return res.status(401).json({error:"Invalid Key"});
    }
    this.apikeyservice = new APIKeyService();
    const result = await this.apikeyservice.validate(key);
    if(!result.success){
        return res.result(401).json({error: "Invalid Key"});
    }
    req.apikey = result;
    next();
}

module.exports = apiValidation;