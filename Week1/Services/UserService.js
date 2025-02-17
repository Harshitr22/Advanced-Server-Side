const userDAO = require('../DOAs/UserDOA');
const {generateHash} = require('../Utilities/bcryptUtil');

class UserService{
    constructor(){
        this.userDAO = new userDAO();
    }


    async create(req){
        try {
            const hashedPassword = await generateHash(req.body.password);
            req.body.password = hashedPassword;
            const result = await this.userDAO.create(req);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
    

}


module.exports = UserService;
