module.exports = (...role) => {
    console.log(`file: AuthRoute.js ~ line 2 ~ role`, role)

    return (req, res, next) => {
        const userRole = req.user.role;
        if (!role.includes(userRole)) {
            return res.status(403).json({
                status: "fail",
                message: "You are not authorized for this route"
            })
        };
        next();
    }
}
