export const parseDate = str => {
  try {
    const date = new Date(Date.parse(str))
    return date.toDateString()
  } catch (error) {
    console.info(error)
    return undefined
  }
}
