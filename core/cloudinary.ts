import cloudinary from 'cloudinary'


//@ts-ignore
cloudinary.config({
    cloud_name: process.env.CLOUDINATY_NAME,
    api_key: process.env.CLOUDINATY_API_KEY,
    api_secret: process.env.CLOUDINATY_API_SECRET
})

export default cloudinary