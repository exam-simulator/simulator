function formatTimeString(str) {
  var re = /0|:/
  if (re.test(str[0]) && str.length > 4) {
    return formatTimeString(str.slice(1))
  }
  return str
}

export default sec => {
  let str = new Date(sec * 1000).toISOString().substr(11, 8)
  return formatTimeString(str)
}
