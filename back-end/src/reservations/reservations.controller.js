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
 
 function movieExists(req, res, next) {
  reservationsService
     .read(req.params.movieId)
     .then((movie) => {
       if (movie) {
         res.locals.product = movie;
         return next();
       }
       next({ status: 404, message: `Movie cannot be found.` });
     })
     .catch(next);
 }
 
 function read(req, res) {
   const { product: data } = res.locals;
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
   read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
   movieExists : asyncErrorBoundary(movieExists),
  create: [hasOnlyValidProperties, hasRequiredProperties, validatePeople, validateDate, validateTime, asyncErrorBoundary(create)],
  update: [asyncErrorBoundary(movieExists), hasOnlyValidProperties, asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(movieExists), asyncErrorBoundary(destroy)],
 };