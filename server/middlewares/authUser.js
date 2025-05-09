import jwt from 'jsonwebtoken';

const authUser = async (req, res, next)=>{
    const {token} = req.body.cookies;
    console.log({token})
    if(!token){
        return res.json({ success: false, message: 'Not Authorized' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        console.log({tokenDecode})
        if(tokenDecode?.id){
            return  req.user ={id :tokenDecode.id};
        //   next();
        }else{
            return res.json({ success: false, message: 'Not Authorized' });
        }
        next();

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export default authUser;