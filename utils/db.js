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
            '$TeacherProfile.firstName$': { [Op.like]: `%${parts[0]}%` },
          },
          {
            '$TeacherProfile.middleName$': { [Op.like]: `%${parts[1]}%` },
          },
          {
            '$TeacherProfile.lastName$': { [Op.like]: `%${parts[2]}%` },
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
            '$TeacherProfile.firstName$': { [Op.like]: `%${parts[0]}%` },
          },
          {
            '$TeacherProfile.middleName$': { [Op.like]: `%${parts[1]}%` },
          },
        ],
      },
      {
        [Op.and]: [
          {
            '$TeacherProfile.middleName$': { [Op.like]: `%${parts[0]}%` },
          },
          {
            '$TeacherProfile.lastName$': { [Op.like]: `%${parts[1]}%` },
          },
        ],
      },
      {
        [Op.and]: [
          {
            '$TeacherProfile.firstName$': { [Op.like]: `%${parts[0]}%` },
          },
          {
            '$TeacherProfile.middleName$': { [Op.like]: `` },
          },
          {
            '$TeacherProfile.lastName$': { [Op.like]: `%${parts[1]}%` },
          },
        ],
      },
    ]
  }

  return [{ username: { [Op.like]: `%${parts[0]}%` } }]
}
