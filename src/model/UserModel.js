import pool from "../configs/connectDB";

const getAllUser = async () => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM user order by id desc"
  );
  return rows;
};

const createUser = async ( username, password, fullname, address, email, sex) => {
  const [result] = await pool.execute(
    "INSERT INTO user (username, password, fullname, address, sex, email,role) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [username, password, fullname, address, sex, email, 1]
  );
  return result;
};

const getDetailUser = async (userId) => {
  const [result] = await pool.execute("SELECT * FROM user WHERE id = ?", [
    userId,
  ]);
  return result;
};

const checkUsername = async (username) => {
    const [result] = await pool.execute("SELECT * FROM user WHERE username = ?", [
        username,
    ]);
    return result;
  };

const updateUser = async (userId, userData) => {
  const { password, fullname, address, sex, email } = userData;

  const [result] = await pool.execute(
    "UPDATE user SET password = ?, fullname = ?, address = ?, sex = ?, email = ? WHERE id = ?",
    [password, fullname, address, sex, email, userId]
  );
  return result;
};

const deleteUser = async (userId) => {
  const [result] = await pool.execute("DELETE FROM user WHERE id = ?", [
    userId,
  ]);

  return result;
};

export default {
  getAllUser,
  createUser,
  updateUser,
  getDetailUser,
  deleteUser,
  checkUsername
};