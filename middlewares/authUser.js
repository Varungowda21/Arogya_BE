import jwt from 'jsonwebtoken';

const authUser = async (req, res, next)=>{
    const {token} = req.cookies;
    console.log(token)

    if(!token){
        return res.json({ success: false, message: 'Not Authorized no token' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(tokenDecode)
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
            console.log(tokenDecode.id)
        }else{
            return res.json({ success: false, message: 'Not Authorized no user Id' });
        }
        next();

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export default authUser;
