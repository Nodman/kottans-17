export const parse = url => {
  const {search, ..._url} = new URL(url)
  const query = search.slice(1).split('&').reduce((acc, item) => {
    const [key, value] = item.split('=')
    acc[key] = value || null
    return acc
  }, {})

  return {..._url, query}
}
