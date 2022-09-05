const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*");
}

function listForDate(date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .orderBy('reservation_time', 'asc');
}

function read(reservation_Id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_Id })
        .first();
  }
  

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

function update(updatedReservation) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, "*");
}

function destroy(review_id) {
    return knex("reservations").where({ review_id }).del();
}

  
module.exports = {
  list,
  listForDate,
  read,
  create,
  update,
  destroy,
};