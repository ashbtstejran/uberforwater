const jwt = require('jsonwebtoken');

class AuthJwt {
    async authJwt(req, res, next) {
        try {
            const token = req.body.token || req.query.token || req.headers["x-access-token"];
            if(!token) {
                return res.status(400).json({
                    message: "Token Is Required For Authentication"
                })
            }else {
                jwt.verify(token, 'M3S3CR3TKY3', (err, data) => {
                    // console.log(err);
                    if(!err) {
                        req.user = data;
                    }else {
                        console.log(err);
                    }
                })
                return next();
            }
        }catch(err) {
            // console.log(err);
            throw err;
        }
    }
}

module.exports = new AuthJwt();

