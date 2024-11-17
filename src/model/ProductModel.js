import pool from "../configs/connectDB"

const getProductWithGroup = async (idGroup) => {
    const [rows, fields] = await pool.execute(
      "SELECT * FROM product WHERE idnhom = ?",
      [idGroup]
    );
    return rows;
  };
  
  const getDetailProduct = async (id) => {
    const [result] = await pool.execute("SELECT * FROM product WHERE masp = ?", [
      id,
    ]);
    return result;
  };
  
  export default {
    getProductWithGroup,
    getDetailProduct,
  };