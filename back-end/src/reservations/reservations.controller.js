/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("first_name","last_name","mobile_number",
"reservation_date","reservation_time","people",);

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function validateDate(req, res, next) {
    const date = Date.parse(req.body.data.reservation_date)
    if (date) {
      return next()
    }
    next({status: 400, message: "reservation_date should be Date object"})
}

function validateTime(req, res, next) {
  const time = req.body.data.reservation_time
  const timeFormat = /\d\d:\d\d/;
  if (time.match(timeFormat)) {
    return next()
  }
  next({status: 400, message: "reservation_time should be Time object"})
}

function validatePeople(req, res, next) {
  const people = req.body.data.people;
  if (typeof people =='number') {
    return next()
  }
  next({status: 400, message: "people should be Number"})
}

function validateNotTuesday(req, res, next) {
  const stringDate = req.body.data.reservation_date
  const date = new Date(stringDate)
  if (date.getUTCDay()!=2) {
    return next()
  }
  next({status: 400, message: `Restaurant is closed on Tuesday, ${stringDate}`})
}

function validateFuture(req, res, next) {
  const date = new Date(req.body.data.reservation_date)
  const today = new Date();
  if (date>today) {
    return next()
  }
  next({status: 400, message: `Reservation can only be made for future dates`})
}

function validateTiming(req, res, next) {
  const timeString = req.body.data.reservation_time;
  const datetime = new Date('1970-01-01T' + timeString + ':00Z');
  const starttime = new Date('1970-01-01T10:30:00Z');
  const endtime = new Date('1970-01-01T21:30:00Z');
  if ((datetime>starttime)&&(datetime<endtime)) {
    return next()
  }
  next({status: 400, message: `Reservation can only be made between 10:30AM - 09:30PM`})
}

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}
 
 async function list(req, res) {
     const date = req.query.date;
     if(date){
       const data = await reservationsService.listForDate(date);
       res.json({ data });
     } else{
       const data = await reservationsService.list();
       res.json({ data });
     }
 }
 
 function reservationExists(req, res, next) {
  reservationsService
     .read(req.params.reservation_Id)
     .then((reservation) => {
       if (reservation) {
         res.locals.reservation = reservation;
         return next();
       }
       next({ status: 404, message: `Reservation cannot be found.` });
     })
     .catch(next);
 }
 
 function read(req, res) {
   const { reservation: data } = res.locals;
   res.json({ data });
 }

 function create(req, res, next) {
  // console.log('Inserting.. ',req.body.data)
  reservationsService
    .create(req.body.data)
    .then((data) => {
      // console.log('Sucessfully inserted');
      res.status(201).json({ data })
    })
    .catch(next);
}

async function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const output = await reservationsService.update(updatedReview);
  //const data = await reservationsService.read_update(res.locals.review.review_id);
  res.json({ output });
}

function destroy(req, res, next) {
  reservationsService
    .destroy(res.locals.review.review_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}
 
 module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
    reservationExists : asyncErrorBoundary(reservationExists),
    create: [hasOnlyValidProperties, hasRequiredProperties, 
      validatePeople, validateDate, validateTime, 
      validateFuture, validateNotTuesday, validateTiming,
      asyncErrorBoundary(create)],
    update: [asyncErrorBoundary(reservationExists), hasOnlyValidProperties, asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(destroy)],
 };