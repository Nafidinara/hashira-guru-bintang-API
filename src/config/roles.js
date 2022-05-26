const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers','getClasses', 'manageClasses','getFacilities','manageFacilities'],
  mentor:['getClasses', 'manageClasses','getFacilities','manageFacilities']
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
