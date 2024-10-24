import pool from '../configs/connectDB'

const getAllUser = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM user')
    return rows
}

const createUser = async (userData) => {
    const { username, password, fullname, address, sex, email } = userData;
    const [result] = await pool.execute(
        
        'INSERT INTO user (username, password, fullname, address, sex, email) VALUES (?, ?, ?, ?, ?, ?)',
        [username, password, fullname, address, sex, email]
    );
    return result;
}
const detailUser = async (user) =>{
    const [rows, fields] = await pool.execute('SELECT * FROM user WHERE user=?', [user])
    return rows[0];
}

export default { getAllUser, createUser, detailUser} 