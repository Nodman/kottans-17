const parseResponse = response => {
  const contentType = response.headers.get('content-type')
  const body = contentType && contentType.includes('application/json')
    ? response.json()
    : response.text()
  return body.then(data => ({
    body: data,
    headers: {
      Link: response.headers.get('Link')
    }
  }))
}


const checkStatus = response => {
  const parsedResponse = parseResponse(response)
  if (response.status >= 200 && response.status < 300) {
    return parsedResponse
  } else if (response.status === 404) {
    return Promise.resolve([])
  }

  return parsedResponse.then(error => Promise.reject(error))
}

const request = (uri, options) => fetch(uri, options).then(checkStatus)

export const get = uri =>
  request(uri, {method: 'GET', headers: {'Accept': 'application/vnd.github.mercy-preview+json'}})
