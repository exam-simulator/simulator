export default array => {
  var current = array.length
  var tmp
  var random

  while (0 !== current) {
    random = Math.floor(Math.random() * current)
    current -= 1
    tmp = array[current]
    array[current] = array[random]
    array[random] = tmp
  }

  return array
}
