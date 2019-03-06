import React from 'react'

export default (variant, correctAnswers) => {
  const alpha = []
  for (let i = 65; i <= 90; i++) {
    alpha.push(String.fromCharCode(i))
  }
  if (variant === 0 || variant === 1) {
    var str = correctAnswers.reduce((acc, val, i) => {
      if (val) {
        acc += `${alpha[i]}, `
      }
      return acc
    }, '')
    return str.trim().substring(0, str.length - 2)
  } else if (variant === 2) {
    var str = correctAnswers.reduce((acc, val) => {
      if (val) {
        acc += `${val.text}, `
      }
      return acc
    }, '')
    return str.trim().substring(0, str.length - 2)
  } else if (variant === 3) {
    return correctAnswers.reduce((acc, val, i) => {
      acc.push(<div key={i}>{`${i + 1}. ${val.text}`}</div>)
      return acc
    }, [])
  }
}
