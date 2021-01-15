import request from '@/utils/request2'

export function faceActionSequence(data) { // 人脸顺序
  return request({
    url: 'legalAuth/faceActionSequence',
    method: 'post',
    data: data
  })
}

// export function uploadFaceFile(data) { // 人脸上传
//   return request({
//     url: 'legalAuth/uploadFaceFile',
//     method: 'post',
//     data: data
//   })
// }

export function uploadFaceFile(res, data) { // 人脸文件上传
  const url = 'legalAuth/uploadFaceFile'
  // if (type === '3') url = 'shareholder/uploadFaceFile'
  return request({
    url,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
}

export function faceCheck(data) { // 人脸验证
  return request({
    url: 'legalAuth/faceCheck',
    method: 'post',
    data: data
  })
}


// 重发uk uk/reSendUK  


export function setReSendUK(data) { // 重发uk
  return request({
    url: 'uk/reSendUK',
    method: 'post',
    data: data
  })
}