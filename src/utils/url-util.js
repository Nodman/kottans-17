export const parseQuery = query => query.reduce((acc, item) => {
  const [key, value] = item.replace(/"/g, '').split('=')
  acc[key] = value || null
  return acc
}, {})

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
  const query = parseQuery(search.slice(1).split('&'))
  return {..._url, query}
}
