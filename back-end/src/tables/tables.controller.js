/**
 * List handler for table resources
 */
 const tablesService = require("./tables.service");
 const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
 const hasProperties = require("../errors/hasProperties");
 const hasRequiredProperties = hasProperties("table_name","capacity",);
 
 const VALID_PROPERTIES = [
   "table_name",
   "capacity",
 ];
 
 function validateCapacity(req, res, next) {
   const capacity = req.body.data.capacity;
   if (typeof capacity =='number') {
     return next()
   }
   next({status: 400, message: "capacity should be Number"})
 }

 function validateCapacityValue(req, res, next) {
    const capacity = req.body.data.capacity;
    //console.log('Table capacity is number',capacity,typeof capacity, capacity>0);
    if (capacity>0) {
      return next()
    }
    next({status: 400, message: "capacity should be non zero"})
  }

 function validateName(req, res, next) {
    const tableName = req.body.data.table_name;
    //console.log('Table name',tableName,tableName.length)
    if (tableName.length>1) {
      return next()
    }
    next({status: 400, message: "table_name should have more than 1 characters"})
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
    const data = await tablesService.list();
    res.json({ data });
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
   tablesService
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
   const output = await tablesService.update(updatedReview);
   //const data = await reservationsService.read_update(res.locals.review.review_id);
   res.json({ output });
 }
 
 function destroy(req, res, next) {
    tablesService
     .destroy(res.locals.review.review_id)
     .then(() => res.sendStatus(204))
     .catch(next);
 }
  
  module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    movieExists : asyncErrorBoundary(movieExists),
   create: [hasOnlyValidProperties, hasRequiredProperties, 
    validateName, validateCapacity, validateCapacityValue,
     asyncErrorBoundary(create)],
   update: [asyncErrorBoundary(movieExists), hasOnlyValidProperties, asyncErrorBoundary(update)],
   delete: [asyncErrorBoundary(movieExists), asyncErrorBoundary(destroy)],
  };