const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class userRepo{
    static async find(){
        const { rows } = await pool.query('SELECT * from users;');
        console.log(rows)
        //return toCamelCase(rows);
        return rows;
    }

    static async findById(id){
        const { rows } = await pool.query(
            `
            SELECT * from users WHERE id = $1;
        `,
            [id]
        );
        //return toCamelCase(rows)[0];
        return rows[0];
    }

    static async insert(username, bio){
        const { rows } = await pool.query('INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *;',
            [username, bio]
        );
        //return toCamelCase(rows)[0];
        return rows[0];
    }

    static async update(id, username, bio){
        const { rows } = await pool.query(
            'UPDATE users SET username = $1 , bio = $2 WHERE id = $3 RETURNING *;',
            [username, bio, id]
        );
        return rows[0];
    }

    static async delete(id){
        const { rows } = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *;',
            [id]
        );
        return rows[0];
    }

    static async count(){
        const { rows } = await pool.query('SELECT COUNT(*) FROM users;');

        return rows[0].count;
    }
}

module.exports = userRepo;