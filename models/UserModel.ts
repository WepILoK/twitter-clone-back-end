import {Document, model, Schema} from "mongoose";

export interface IUserModel {
    _id?: string
    email: string
    fullName: string
    userName: string
    password: string
    confirmHash: string
    confirmed?: boolean
    location?: string
    about?: string
    website?: string
}

export type IUserModelDocument = IUserModel & Document;

const UserSchema = new Schema<Document<IUserModel>>({
    email: {
        unique: true,
        required: true,
        type: String,
    },
    fullName: {
        required: true,
        type: String,
    },
    userName: {
        unique: true,
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    confirmHash: {
        required: true,
        type: String,
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    location: String,
    about: String,
    website: String
}, {
    timestamps: true
});



export const UserModel = model<IUserModelDocument>('User', UserSchema)