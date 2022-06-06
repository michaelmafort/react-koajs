const throwValidationFailResponse = (ctx, e) => {
    let data = [];
    for( key in e.errors ) {
        if( e.errors.hasOwnProperty(key) ) {
            data.push({
                field: key,
                message: e.errors[key].properties.message,
            })
        }
    }

    ctx.status = 400;
    ctx.body = { data, error: true, errorType: e.constructor.name };
};

const throwUpdatedFailResponse = (ctx, message) => {
    ctx.status = 400;
    ctx.body = { error: true, message: message, errorType: 'updating' };
}

module.exports = {
    throwValidationFailResponse,
    throwUpdatedFailResponse,
}