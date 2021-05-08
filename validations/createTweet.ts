import {body} from 'express-validator'

export const createTweetsValidation = [
    body('text', 'Введите текст твита.')
        .isString()
        .isLength({
            max: 280
        })
        .withMessage('Максимальное длина твита 280 символов'),
]
