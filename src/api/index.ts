import request from '@/utils/request'

export async function queryProse(): Promise<any> {
  return request('/project/prose')
}

export async function getDepartments(data): Promise<any> {
  return request({
    url: '/api/Department/GetDepartments',
    method: 'post',
    data,
  })
}

export async function GetUsers(query): Promise<any> {
  return request({
    url: '/api/User/GetUsers',
    method: 'get',
    params: query,
  })
}

export async function getDocumentToken(id, isVersion = false) {
  return request({
    url: `/api/document/${id}/token?isVersion=${isVersion}`,
    method: 'get',
    headers: { Accept: 'application/json' },
  })
}

export async function listTransformFile(query) {
  return request({
    url: '/api/Circulation/GetCirculationDocs',
    method: 'get',
    params: query,
  })
}

export async function getTransFormDetail(query) {
  return request({
    url: '/api/Circulation/GetCirculationDoc',
    method: 'get',
    params: query,
  })
}

// 学习确认
export async function updateCirculationDocStudy(data) {
  return request({
    url: '/api/Circulation/UpdateCirculationDocStudy',
    method: 'post',
    data,
  })
}

export async function updateCirculationDocAnswer(data) {
  return request({
    url: '/api/Circulation/UpdateCirculationDocAnswer',
    method: 'post',
    data,
  })
}

// 登录方法
export async function handelLogin(data) {
  return request({
    url: '/api/User/login',
    method: 'POST',
    data,
    headers: {
      userName: data.userName,
    },
  })
}

// 文件列表接口
export async function listDocument(query) {
  return request({
    url: '/api/Document/search',
    method: 'get',
    params: query,
  })
}


// 下发接口
export async function sendCirculationDocMobile(data) {
  return request({
    url: '/api/Circulation/SendCirculationDocMobile',
    method: 'post',
    data,
  })
}

// 文件传阅列表接口
export async function getCirculationList(query) {
  return request({
    url: '/api/Circulation/GetCirculationDocs',
    method: 'get',
    params: query,
  })
}

export async function getCirculationDetail(id) {
  return request({
    url: `/api/Circulation/GetCirculationDocAdmin?id=${id}`,
    method: 'get',
  })
}
