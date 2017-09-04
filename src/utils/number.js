export const floor = value => Math.ceil(value / 1000 * 10) / 10
export const floorStars = value => value > 999
  ? `${floor(value)}k`
  : value

export const floorBytes = value => value > 999
  ? `${floor(value)}kB`
  : `${value} B`

export const calcLanguages = langData => {
  const langArray = Object.keys(langData)
  const totalSize = langArray.reduce((acc, key) => acc + langData[key], 0)
  return langArray.filter(lang => langData[lang] > 1000).map(key => {
    const bytes = langData[key]
    return {
      name: key,
      size: `${floor(bytes)}kB`,
      percentage: (bytes / totalSize * 100).toFixed(2)
    }
  })
}

