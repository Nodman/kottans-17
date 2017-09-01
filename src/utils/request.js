const parseResponse = response => {
  const contentType = response.headers.get('content-type')
  const body = contentType && contentType.includes('application/json')
    ? response.json()
    : response.text()
  return {
    body,
    headers: {
      Link: response.headers.get('Link')
    }
  }
}


const checkStatus = response => {
  const parsedResponse = parseResponse(response)
  if (response.status >= 200 && response.status < 300) {
    return parsedResponse
  }

  return Promise.reject(parsedResponse)
}

const request = (uri, options) => fetch(uri, options).then(checkStatus)

request.get = uri =>
  request(uri, {method: 'GET', headers: {'Accept': 'application/vnd.github.mercy-preview+json'}})

export default request
