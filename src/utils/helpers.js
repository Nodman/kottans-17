export const filtersActions = {
  has_topics: value => repo => value ? repo.topics.length : true,
  has_open_issues: value => repo => value ? repo.open_issues_count > 0 : true,
  starred_gt: value => repo => repo.stargazers_count >= value,
  updated_at: value => repo => Date.parse(repo.updated_at) > Date.parse(value),
  language: value => repo => value === 'all' ? true : repo.language === value,
  type: value => repo => {
    switch (value) {
      case 'fork':
        return repo.fork
      case 'source':
        return !repo.fork
      default:
        return true
    }
  }
}

export const yeap = () => () => true

export const applySort = (array, {sort, order}) => {
  if (sort) {
    const property = sort
    const sortedArray = array.sort((a, b) => {
      if (a[property] > b[property]) {
        return 1
      }
      if (a[property] < b[property]) {
        return -1
      }
      return 0
    })
    return order === 'desc' ? sortedArray.reverse() : sortedArray
  }
  return array
}

export const getLanguages = reposData =>
  reposData.reduce((acc, {language}) => acc.includes(language) ? acc : [...acc, language], [])
