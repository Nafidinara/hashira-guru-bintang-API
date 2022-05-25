const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers','getClasses', 'manageClasses'],
  mentor:['getClasses', 'manageClasses']
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
