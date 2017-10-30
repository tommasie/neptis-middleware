import jwt = require('jsonwebtoken');

export class Token {

    //TODO fix secret
    private static secret: string = 'secret';
    constructor() {
    }

    static generateToken(id: number, email: string) {
        var token = jwt.sign(
            {
                id: id,
                email: email,
             },
             Token.secret,
            {expiresIn:'1h'});
        return token;
    }

    static verifyToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, Token.secret, (err, decoded) => {
                if(err) {
                    reject(err);
                }
                else resolve(decoded.id);
            });
        });
    }
}
