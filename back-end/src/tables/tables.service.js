const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy('table_name', 'asc');;
}

function read(reviewId) {
    return knex("reviews").select("*").where({ review_id: reviewId }).first();
  }
  

function create(table) {
    return knex("tables")
        .insert(table)
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
  read,
  create,
  update,
  destroy,
};