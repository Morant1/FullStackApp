// import axios from 'axios';

export const cloudinary = {
    uploadImg
}

async function uploadImg(target) {
    const CLOUD_NAME = "coding-academy"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', target.files[0])
    formData.append('upload_preset', 'hxpsra0y');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log(data);
        return data.url

    } catch (err) {
        console.log(err);
    }
    // .then(res => res.json())
    // .then(res => {
    //     console.log(res)
    //     // res.secure_url
    //     return res
    // })
    // .catch (err => console.error(error))
}
