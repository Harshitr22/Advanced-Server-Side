const jwt = require('jsonwebtoken');


const checkSession = async(req, res, next) => {

    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split

    if(token){
        jwt.verify(token, process.env.JWT_SECRET || 'my_secret',  (err, decoded) => {
            if(err){
                return res.status(401).json({error: "Invalid Token"})
            }
            req.user = decoded
            next()
        })
    }

    else if(!req.session.isAuthenticated){
        return res.status(401).json({
            error: "Unauthorized",
            message: "Invalid User"
        })
    }
    next();
}

module.exports = checkSession