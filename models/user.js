const db = require("../config/db");

class User {
  constructor(full_name, email, userProfileUrl, access_token, id_token) {
    this.full_name = full_name;
    this.email = email;
    this.userProfileUrl = userProfileUrl;
    this.access_token = access_token;
    this.id_token = id_token;
  }

  save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth();
    let dd = d.getDate();

    let createdAtDate = `${yyyy}-${mm}-${dd}`;
    let updatedAtDate = `${yyyy}-${mm}-${dd}`;

    let sql = `INSERT INTO users (
            full_name,
            email,
            userProfileUrl,
            access_token,
            id_token,
            created_at,
            updated_at
            )
            VALUES(
            '${this.full_name}'
            ,'${this.email}'
            ,'${this.userProfileUrl}'
            ,'${this.access_token}'
            ,'${this.id_token}'
            ,'${createdAtDate}'
            ,'${updatedAtDate}');`;

    return db.execute(sql);
  }

  static findAll() {
    let sql = `SELECT * FROM shortlet;`;

    return db.execute(sql);
  }

  static findByEmail(email) {
    let sql = `SELECT * FROM users WHERE email = '${email}';`;

    return db.execute(sql);
  }

  static findByRole(adminRole) {
    let sql = `SELECT * FROM users WHERE role = '${adminRole}';`;

    return db.execute(sql);
  }

  static UpdateAccessToken(access_token, id_token, email) {
    let sql = `UPDATE users SET access_token = '${access_token}',id_token = '${id_token}'   WHERE email = '${email}';`;
    return db.execute(sql);
  }

  static findByToken(accessToken) {
    let sql = `SELECT * FROM users WHERE access_token = '${accessToken}';`;
    return db.execute(sql);
  }

  static findById(userId) {
    let sql = `SELECT * FROM users WHERE id = '${userId}';`;

    return db.execute(sql);
  }
}

module.exports = User;
