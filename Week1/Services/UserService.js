const userDAO = require('../DOAs/UserDOA');
const {generateHash, verify} = require('../Utilities/bcryptUtil');

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
    
    async authenticate(req){
        try{
            const result = await this.userDAO.getByEmail(req.body.email);
            if(!result.length){
                console.log(result);
            }
            // console.log(result);
            // console.log(result.data._password_);

            const isMatch = await verify(req.body.password, result.data[0]._password_);
            if(isMatch){
                req.session.user = {
                    id: result.data[0]._id,
                    email: result.data[0].email,
                    f_name: result.data[0]._f_name_
                }
            }else{
                return isMatch;
            }
        }
        catch(error){
            console.log(error);
        }
    }

}


module.exports = UserService;
