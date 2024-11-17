import pool from "../configs/connectDB"

const getAllGroups = async () => {
    const [rows, fields] = await pool.execute(
      "SELECT * FROM `group` WHERE 1"
    );
    return rows;
  };
  
  export default {
    getAllGroups
  };