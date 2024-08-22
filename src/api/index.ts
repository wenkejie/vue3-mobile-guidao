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

export async function getStarredDocuments(query) {
  return request({
    url: '/api/DocumentStarred/GetStarredDocuments',
    method: 'get',
    params: query,
  })
}

export async function toggleDocumentStarred(data) {
  return request({
    url: '/api/DocumentStarred/ToggleDocumentStarred',
    method: 'post',
    data,
  })
}

export async function fileDownload(id) {
  return request({
    url: `/api/Document/${id}/downloadAnon`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'blob',
    method: 'get',
  })
}

/**
 * 通用下载方法
 * @param {*} url 请求地址
 * @param {*} params 请求参数
 * @param {*} config 配置
 * @returns
 */
export async function downFile(url, params, config) {
  // Show loading toast
  const loadingToast = showLoadingToast({
    message: '正在下载数据，请稍候',
    forbidClick: true,
    duration: 0, // Keep the toast open indefinitely
  });

  try {
    const resp = await service.get(url, {
      params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
      ...config,
    });

    const { data } = resp;

    const isLogin = await blobValidate(data);
    if (isLogin) {
      const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*');
      const contentDisposition = decodeURI(resp.headers['content-disposition']);
      const result = patt.exec(contentDisposition);
      let fileName = result[1].replace(/\"/g, '');

      const blob = new Blob([data]);
      saveAs(blob, fileName);
    } else {
      const resText = await data.text();
      const rspObj = JSON.parse(resText);
      const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default'];

      showToast({
        message: errMsg,
        type: 'fail',
      });
    }
  } catch (error) {
    showToast({
      message: '下载文件出现错误，请联系管理员！',
      type: 'fail',
    });
  } finally {
    loadingToast.clear(); // Close the loading toast
  }
}
