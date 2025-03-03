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

            if (!result || result.length === 0) {
                return { success: false, message: "User not found" }; 
            }

            console.log("User Retrieved:", result);
            // console.log(result);
            //console.log(result.data[0]._password_);
            

            const isMatch = await verify(req.body.password, result.data[0]._password_);
            if(isMatch ){

                const user_agent = req.headers['user-agent'];
                const isBrowser = user_agent && user_agent.includes('Mozilla') || user_agent.includes('safari') || user_agent.includes('Chrome') || user_agent.includes('Edge');

                if(isBrowser){
                    req.session.user = {
                        id: result.data[0]._id_,
                        email: result.data[0]._email_,
                        f_name: result.data[0]._f_name_
                    }
                    req.session.isAuthenticated = true;
                    return "Authenticated";
                }else{
                    const jwt = require('jsonwebtoken');

                    const payload = {
                        name: `${result.data[0]._f_name_} ${result.data[0]._l_name_}`
                    }

                    const token = jwt.sign(
                        payload,
                        process.env.JWT_SECRET || 'my_secret',
                        {expiresIn: '1d'}
                    )
                    return{
                        success: true,
                        message: 'Authenticated',
                        token: token,
                        user:{
                            name: `${result.data[0]._f_name_} ${result.data[0]._l_name_}`
                        }
                    }
                }
            }else{
                return {
                    success: false,
                    message: 'Password does not match'
                }
            }
        }
        catch(error){
            console.log(error);
        }
    }

}


module.exports = UserService;
