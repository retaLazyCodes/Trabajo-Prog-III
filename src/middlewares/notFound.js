export const notFound = (request, response, next) => {
    return response.status(404).json({
        error: -2,
        description: 'ruta: ' + request.originalUrl + ' metodo: ' + request.method + ' no implementada'
    });
};
