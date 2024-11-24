import parseToken from '../utility/parseToken.js';

function tokenMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split('.')[1];
    if (authHeader === null)
        return res.status(401).json({
            code: 0,
            message: 'No provide authorization header'
        });
    if (token === null) return res.status(401).json({
        code: 0,
        message: 'Unauthorized'
    });
    const payload = parseToken(authHeader);
    if(!payload){
        return res.status(401).json({
            code: 0,
            message: 'Unauthorized'
        });
    }
    req.payload = payload;
    next();
}

export default tokenMiddleware;