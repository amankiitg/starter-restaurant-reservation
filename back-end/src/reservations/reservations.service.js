const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*");
}

function listForDate(date) {
  return knex("reservations").select("*").where({ reservation_date: date });
}

function read(reviewId) {
    return knex("reviews").select("*").where({ review_id: reviewId }).first();
  }
  

function create(reservation) {
return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedReview) {
return knex("reservations")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
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