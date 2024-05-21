import request from '@/utils/request'

export async function queryProse(): Promise<any> {
  return request('/project/prose')
}


export async function getDepartments(data): Promise<any> {
  return request({
    url: '/api/Department/GetDepartments',
    method: 'post',
    data: data
  })
}

export async function GetUsers(query): Promise<any> {
  return request({
    url: '/api/User/GetUsers',
    method: 'get',
    params: query
  })
}

