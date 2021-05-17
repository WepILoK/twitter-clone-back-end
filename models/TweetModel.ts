import { model, Schema, Document } from "mongoose";
import { IUserModel } from "./UserModel";

export interface ITweetModel {
    _id?: string
    text: string
    user: IUserModel
    images?: string[]
}

export type ITweetModelDocument = ITweetModel & Document

const TweetSchema = new Schema<ITweetModelDocument>({
    text: {
        required: true,
        type: String,
        maxlength: 280,
    },
    user: {
        required: true,
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    images: [
        {
            type: String
        }
    ]
}, {
    timestamps: true
})

export const TweetModel = model<ITweetModelDocument>('Tweet', TweetSchema)