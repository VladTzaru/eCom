import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@app.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Vlad',
    email: 'vlad@app.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Dave',
    email: 'dave@app.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
