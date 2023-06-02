const prisma = require("./prisma");

const usedEmail = (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const saveUser = (user) => {
  return prisma.user.create({
    data: user,
  });
};

module.exports = {
  usedEmail,
  saveUser,
};
