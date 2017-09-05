export const parseQuery = query => {
  const _q = query instanceof Array ? query : query.slice(1).split('&')
  return _q.reduce((acc, item) => {
    const [key, value] = item.replace(/"/g, '').split('=')
    if (!key.trim()) {
      return acc
    }
    acc[key] = value || true
    return acc
  }, {})
}

export const composeQuery = queryObj => {
  const res = Object.keys(queryObj).reduce((acc, key) => {
    if (!key.trim()) {
      return acc
    }
    const value = queryObj[key]
    let pair = ''
    if (typeof (value) === 'boolean') {
      pair = value ? key : pair
    } else {
      pair = value ? `${key}=${value}` : ''
    }
    return [...acc, pair].filter(str => str)
  }, []).join('&')

  return res
}

export const parseGHLink = link => {
  const items = link.split(',')
  return items.reduce((acc, item) => {
    const [link, rel] = item.replace(/^\s|[<>;]/g, '').split(' ')
    const index = parseQuery([rel]).rel
    const {query: {page}} = parseURL(link)
    acc[index] = {index, link, page}
    return acc
  }, {})
}

export const parseURL = url => {
  const {search, ..._url} = new URL(url)
  const query = parseQuery(search)
  return {..._url, query}
}
