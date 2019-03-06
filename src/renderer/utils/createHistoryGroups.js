/**
 * Group exam history by filename and find average score for each exam
 * Resturctures data to simplify rendering
 * @param history {object[]} - array of exam report objects
 */
export default history => {
  // isolate unique filenames
  const uniqueFilenames = []
  history.forEach((el, i) => {
    el.indexHistory = i
    if (uniqueFilenames.indexOf(el.filename) === -1) {
      uniqueFilenames.push(el.filename)
    }
  })

  // restructure history into an object map
  // key = unique filename, value = array of reports for that filename
  const groupedByFilename = history.reduce((acc, val) => {
    if (acc[val.filename]) {
      acc[val.filename].push(val)
    } else {
      acc[val.filename] = [val]
    }
    return acc
  }, {})

  // calculate the average score and elapsed time for each group
  const averageScores = []
  const averageTimes = []
  for (let prop in groupedByFilename) {
    const totalScore = groupedByFilename[prop].reduce((acc, val) => (acc += val.score), 0)
    const averageScore = Math.ceil(totalScore / groupedByFilename[prop].length)
    averageScores.push(averageScore)
    const totalTime = groupedByFilename[prop].reduce((acc, val) => (acc += val.elapsed), 0)
    const averageTime = Math.ceil(totalTime / groupedByFilename[prop].length)
    averageTimes.push(averageTime)
  }

  return [groupedByFilename, uniqueFilenames, averageScores, averageTimes]
}
