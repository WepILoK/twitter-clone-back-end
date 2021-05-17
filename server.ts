import dotenv from 'dotenv';

dotenv.config();
import './core/db';

import express from 'express';
import multer from 'multer';

import {passport} from "./core/passport";
import {registerValidations} from "./validations/register";
import {createTweetsValidation} from "./validations/createTweet";

import {UserCtrl} from "./controllers/UserController";
import {TweetsCtrl} from "./controllers/TweetsController";
import {UploadFileCtrl} from "./controllers/UploadFileController";


const app = express();
const storage = multer.memoryStorage()
const upload = multer({storage})


app.use(express.json());
app.use(passport.initialize())

app.get('/users', UserCtrl.index);
app.get('/users/me', passport.authenticate('jwt',{session: false}), UserCtrl.getUserInfo);
app.get('/users/:id', UserCtrl.show);

app.get('/tweets', TweetsCtrl.index)
app.get('/tweets/:id', TweetsCtrl.show)
app.delete('/tweets/:id', passport.authenticate('jwt'), TweetsCtrl.delete)
app.patch('/tweets/:id', passport.authenticate('jwt'), createTweetsValidation, TweetsCtrl.update)
app.post('/tweets', passport.authenticate('jwt'), createTweetsValidation, TweetsCtrl.create)

app.get('/auth/verify', registerValidations, UserCtrl.verify);
app.post('/auth/register', registerValidations, UserCtrl.create);
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin)

app.post('/upload', upload.single('image'), UploadFileCtrl.upload)


app.listen(process.env.PORT, () => {
    console.log("SERVER IS RUNNING!")
})