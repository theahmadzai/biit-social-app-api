exports.semesterYearToSemester = semesterYear => {
  if (Number.isInteger(semesterYear)) {
    return semesterYear
  }

  const year = semesterYear.substring(0, 4)
  const type = semesterYear.substring(4, 5)

  let semester = (new Date().getFullYear() - year) * 2 - 1

  if (type.toLowerCase() === 's') {
    semester += 1
  }

  if (semester > 8) {
    semester = 'GRADUATED'
  }

  return semester
}

exports.getStudentClass = student => {
  return `${student.program}-${this.semesterYearToSemester(student.semester.trim())}${
    student.section
  }`
}
