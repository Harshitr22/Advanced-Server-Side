

const checkSession = async(req, res, next) => {
    if(!req.session.isAuthenticated){
        return res.status(401).json({
            error: "Unauthorized",
            message: "Invalid User"
        })
    }
    next();
}

module.exports = checkSession