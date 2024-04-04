const errorHandler = (error, req, res, next) => {
    let status = 500
    let message = 'Internal Server Error'

    console.log(error, "?????????");

    if(error.name == "SequelizeValidationError" || error.name == "ValidationErrorItem"){
        status = 400
        message = error.errors[0].message
    }

    if(error.name == 'password cannot be null'){
        status = 400
        message = 'password cannot be null'
    }
    
    if(error.name == "Unauthorized"){
        status = 401
        message = "Unauthorized"
    }

    if(error.name == "SequelizeForeignKeyConstraintError"){
        status =  404
        message = 'Data not found'
    }

    if(error.name == "SequelizeUniqueConstraintError"){
        status = 404
        message = 'Data not found'
    }

    if (error.name == 'JsonWebTokenError') {
        status = 401
        message = 'Unauthorized'
    }

    if (error.name == 'SequelizeDatabaseError') {
        status = 401
        message = 'Unauthorized'
    }

    if (error.name == 'Forbidden') {
        status = 403
        message = 'You have no access'
    }

    if (error.name == "error not found"){
        status = 404
        message = 'error not found'
    }

    res.status(status).json({message})

}

module.exports = errorHandler