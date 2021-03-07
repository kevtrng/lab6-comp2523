const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    isAdmin: true,
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    isAdmin: false,
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    isAdmin: false,
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findUser: (id) => {
    const user = database.find((user) => user.id === id)
    return user
  },
  createUser: (profile) => {
    const user = {
      id: parseInt(profile.id),
      name: profile.username,
      url: profile.profileUrl,
      isAdmin: false
    }
    database.push(user);
    return user;
  }
};

module.exports = { database, userModel };
