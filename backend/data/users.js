import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Dubu",
    email: "dubu@example.com",
    password: bcrypt.hashSync("dubu1998", 10),
    isAdmin: false,
  },
  {
    name: "bae",
    email: "bae@example.com",
    password: bcrypt.hashSync("bae1994", 10),
    isAdmin: false,
  },
];

export default users;