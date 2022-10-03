import { utilService } from '../services/util.service.js'

export const uploadService = {
  uploadImg
}

function uploadImg(ev) {
  const CLOUD_NAME = "dln4kbx1f"
  const UPLOAD_PRESET = "hvy2mzrd"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData()
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('file', ev.target.files[0])

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      return ({
        id: utilService.makeId(),
        urlName: res.original_filename,
        url: res.secure_url,
        fileFormat:res.format,
        addedAt: new Date()
      })
    })
    .catch(err => console.error(err))
}
