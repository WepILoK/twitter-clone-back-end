import passport from "passport"
import {Strategy as LocalStrategy} from 'passport-local'
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt'
import {IUserModel, IUserModelDocument, UserModel} from "../models/UserModel";
import {generateMD5} from "../utils/generateHash";

passport.use(
    new LocalStrategy(async (username, password, done): Promise<void> =>{
        try {
            const user = await UserModel.findOne({$or: [{email: username}, {username}]}).exec()
            if (!user) {
                return done(null, false)
            }

            if (user.password == generateMD5(password + process.env.SECRET_KEY)){
                done(null, user)
            } else {
                done(null, false)
            }
        } catch (error) {
            done(error, false)
        }
    }
));

passport.use(
    new JWTStrategy(
        {
            secretOrKey: process.env.SECRET_KEY,
            jwtFromRequest: ExtractJwt.fromHeader('token')
        },
        async (payload: {data: IUserModel}, done): Promise<void> => {
            try {
                const user = await UserModel.findById(payload.data._id).exec()
                if (user) {
                    return done(null, user)
                }
                done(null, false)
            } catch (error) {
                done(error, false)
            }
        }
    )
)

// @ts-ignore
passport.serializeUser((user: IUserModel, done) => {
    done(null, user?._id)
})

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err: Error, user: IUserModelDocument | null) => {
        done(err, user)
    })
})

export {passport}