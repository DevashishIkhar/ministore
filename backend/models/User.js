// models/User.js
// No database - users are managed in auth.routes.js in-memory array
// This file is kept as a placeholder schema reference

const UserSchema = {
  id: "string",
  name: "string (required)",
  email: "string (required, unique)",
  password: "string (required, hashed)",
};

export default UserSchema;