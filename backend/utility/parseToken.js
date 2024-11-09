import jwt from 'jsonwebtoken';

function parseToken(token) {
    try {
        const payload = jwt.verify(token, 'HELLOWORLD');
        return payload;
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            console.error('The token has expired');
            return null;

        }
        console.error('Error decodeing token');
        return null;
    }
}
export default parseToken;