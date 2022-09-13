const db = require("../config/db");

class Shortlet {
  constructor(
    apartment_name,
    state,
    number_of_rooms,
    amount_per_night,
    address,
    bedroom_image_url,
    bathroom_image_url
  ) {
    this.apartment_name = apartment_name;
    this.state = state;
    this.number_of_rooms = number_of_rooms;
    this.amount_per_night = amount_per_night;
    this.address = address;
    this.bathroom_image_url = bathroom_image_url;
    this.bedroom_image_url = bedroom_image_url;
  }

  save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth();
    let dd = d.getDate();

    let createdAtDate = `${yyyy}-${mm}-${dd}`;
    let updatedAtDate = `${yyyy}-${mm}-${dd}`;

    let sql = `INSERT INTO shortletsTable (apartment_name,state,number_of_rooms,amount_per_night,address,bedroom_image_url,bathroom_image_url,created_at,updated_at)
                VALUES (
            '${this.apartment_name}'
            ,'${this.state}'
            ,'${this.number_of_rooms}'
            ,'${this.amount_per_night}'
            ,'${this.address}'
            ,'${this.bedroom_image_url}'
            ,'${this.bathroom_image_url}'
            ,'${createdAtDate}'
            ,'${updatedAtDate}');`;

    return db.execute(sql);
  }

  static findAll() {
    let sql = `SELECT * FROM shortletsTable;`;

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM shortletsTable WHERE id = '${id}';`;

    return db.execute(sql);
  }
  static findAllAndLimit(limit) {
    let sql = `SELECT * FROM shortletsTable LIMIT ${limit};`;
    return db.execute(sql);
  }

  //for available (0 = false while 1 = true)
  static findShortletByIdAndUpdateAvailability(
    shortletId,
    number_of_nights,
    userId
  ) {
    let sql = `UPDATE shortletsTable SET available = 0 ,number_of_nights = '${number_of_nights}' ,book_user_id = '${userId}' WHERE id = '${shortletId}';`;
    return db.execute(sql);
  }
}

module.exports = Shortlet;
