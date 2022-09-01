/**
 * List handler for table resources
 */

 const reservationsService = require("../reservations/reservations.service")
 const tablesService = require("./tables.service");
 const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
 const hasProperties = require("../errors/hasProperties");
 const hasRequiredProperties = hasProperties("table_name","capacity");
 const hasReservationId = hasProperties("reservation_id");
 
 const VALID_PROPERTIES = [
   "table_name",
   "capacity",
 ];

 const VALID_PROPERTIES_FOR_UPDATE = [
  "reservation_id",
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

 function hasOnlyValidPropertiesUpdate(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES_FOR_UPDATE.includes(field)
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
  
  function tableExists(req, res, next) {
    tablesService
      .read(req.params.table_id)
      .then((table) => {
        if (table) {
          res.locals.table = table;
          return next();
        }
        next({ status: 404, message: `Table cannot be found.` });
      })
      .catch(next);
  }
  
  function read(req, res) {
    const { table: data } = res.locals;
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
   const updatedTable = {
     ...req.body.table,
     table_id: res.locals.table.table_id,
     reservation_id: res.locals.reservation.reservation_id,
   };
   const output = await tablesService.update(updatedTable);
   res.json({ output });
 }
 
 function destroy(req, res, next) {
  // const updatedTable = {
  //   ...req.body.data,
  //   table_id: res.locals.table.table_id,
  // };
  // const output = await tablesService.update(updatedTable);
  // res.json({ output });
    const { table: data } = res.locals;
    res.json({ data });
 }

 function reservationExists(req, res, next) {
  
  const reservation_Id = req.body.data.reservation_id;
  reservationsService
     .read(reservation_Id)
     .then((reservation) => {
       if (reservation) {
         //console.log('Checking from Tables reservationExists', reservation)
         res.locals.reservation = reservation;
         return next();
       }
       next({ status: 404, message: `${reservation_Id} cannot be found.` });
     })
     .catch(next);
 }

 function checkTableCapacity(req, res, next) {

   const table = res.locals.table;
   const reservation = res.locals.reservation;
   
  if (table.capacity>=reservation.people) {
    return next()
  }
  next({status: 400, message: "Table does not have sufficient capacity"})
}

function checkTableAvaible(req, res, next) {
  
  const table = res.locals.table;
  
 if (!table.reservation_id) {
   return next()
 }
 next({status: 400, message: "Table is currently occupied"})
}
  
  module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
   create: [hasOnlyValidProperties, hasRequiredProperties, 
    validateName, validateCapacity, validateCapacityValue,
     asyncErrorBoundary(create)],
   update: [asyncErrorBoundary(tableExists), hasReservationId, 
    asyncErrorBoundary(reservationExists),   asyncErrorBoundary(checkTableAvaible),
    asyncErrorBoundary(checkTableCapacity), asyncErrorBoundary(update)],
   delete: [asyncErrorBoundary(tableExists), asyncErrorBoundary(destroy)],
  };