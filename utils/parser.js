exports.parseDatesheet = datesheet => {
  const data = []

  const [, titleRow, timeRow, , headerRow, ...rows] = datesheet

  const title = titleRow.filter(cell => cell !== null && cell.length > 0).join(' ')
  const time = timeRow.filter(cell => cell !== null && cell.length > 0).join(' ')

  const [, , ...groups] = headerRow

  rows.forEach(row => {
    const [day, date, ...courses] = row

    if (!day) return

    courses.forEach((course, i) => {
      if (!course) return

      data.push({
        title,
        time,
        day,
        date,
        class: groups[i],
        course: course
          .split(' ')
          .filter(c => c.length)
          .join(' '),
      })
    })
  })

  return data
}

exports.parseTimetable = timetable => {
  const data = []

  while (timetable.length > 0) {
    const rows = timetable.splice(0, 9)

    const [header, ...body] = rows
    const [day, ...groups] = header

    if (!day) return

    body.forEach(row => {
      const [time, ...events] = row

      if (!time) return

      groups.forEach((group, i) => {
        if (!group || !events[i]) return

        data.push({
          day,
          time,
          class: group,
          course: events[i].substr(0, events[i].indexOf(' ')),
          teacher: events[i].substr(events[i].lastIndexOf('(')),
        })
      })
    })
  }

  return data
}
