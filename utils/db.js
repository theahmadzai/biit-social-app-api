const { Op } = require('sequelize')

exports.searchUsersOperators = parts => {
  if (parts.length === 3) {
    return [
      {
        [Op.and]: [
          {
            '$StudentProfile.firstName$': { [Op.like]: `%${parts[0]}%` },
          },
          {
            '$StudentProfile.middleName$': { [Op.like]: `%${parts[1]}%` },
          },
          {
            '$StudentProfile.lastName$': { [Op.like]: `%${parts[2]}%` },
          },
        ],
      },
      {
        [Op.and]: [
          {
            '$EmployeeProfile.firstName$': { [Op.like]: `%${parts[0]}%` },
          },
          {
            '$EmployeeProfile.middleName$': { [Op.like]: `%${parts[1]}%` },
          },
          {
            '$EmployeeProfile.lastName$': { [Op.like]: `%${parts[2]}%` },
          },
        ],
      },
    ]
  }

  if (parts.length === 2) {
    return [
      {
        [Op.and]: [
          {
            '$StudentProfile.firstName$': { [Op.like]: `%${parts[0]}%` },
          },
          {
            '$StudentProfile.middleName$': { [Op.like]: `%${parts[1]}%` },
          },
        ],
      },
      {
        [Op.and]: [
          {
            '$StudentProfile.middleName$': { [Op.like]: `%${parts[0]}%` },
          },
          {
            '$StudentProfile.lastName$': { [Op.like]: `%${parts[1]}%` },
          },
        ],
      },
      {
        [Op.and]: [
          {
            '$StudentProfile.firstName$': { [Op.like]: `%${parts[0]}%` },
          },
          {
            '$StudentProfile.middleName$': { [Op.like]: `` },
          },
          {
            '$StudentProfile.lastName$': { [Op.like]: `%${parts[1]}%` },
          },
        ],
      },
      {
        [Op.and]: [
          {
            '$EmployeeProfile.firstName$': { [Op.like]: `%${parts[0]}%` },
          },
          {
            '$EmployeeProfile.middleName$': { [Op.like]: `%${parts[1]}%` },
          },
        ],
      },
      {
        [Op.and]: [
          {
            '$EmployeeProfile.middleName$': { [Op.like]: `%${parts[0]}%` },
          },
          {
            '$EmployeeProfile.lastName$': { [Op.like]: `%${parts[1]}%` },
          },
        ],
      },
      {
        [Op.and]: [
          {
            '$EmployeeProfile.firstName$': { [Op.like]: `%${parts[0]}%` },
          },
          {
            '$EmployeeProfile.middleName$': { [Op.like]: `` },
          },
          {
            '$EmployeeProfile.lastName$': { [Op.like]: `%${parts[1]}%` },
          },
        ],
      },
    ]
  }

  return [{ username: { [Op.like]: `%${parts[0]}%` } }]
}

exports.matchStudentClass = ({ program, semester, section }) => {
  return {
    class: {
      [Op.like]: `%${program.substring(0, 1)}%${program.substring(1)}%-%${semester}%${section}%`,
    },
  }
}
