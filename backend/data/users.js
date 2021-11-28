import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@beifong.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    image: "/uploads/images/sample-user.jpeg",
    cart: {
      items: [],
    },
  },
  {
    name: "Dubu",
    email: "dubu@example.com",
    password: bcrypt.hashSync("dubu1998", 10),
    image: "/uploads/images/sample-user.jpeg",
    isAdmin: false,
    cart: {
      items: [],
    },
  },
  {
    name: "bae",
    email: "bae@example.com",
    password: bcrypt.hashSync("bae1994", 10),
    image: "/uploads/images/sample-user.jpeg",
    isAdmin: false,
    cart: {
      items: [],
    },
  },
];

export default users;
