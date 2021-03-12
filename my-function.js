exports.handler = async (event, error) => {
    // TODO implement
    
    if(event && event.queryStringParameters && event.queryStringParameters.keyword){
            
            return {
                statusCode :200,
                body: JSON.stringify(event.queryStringParameters.keyword )
            }
        }
        if (event && (!event.queryStringParameters || !event.queryStringParameters.keyword)){
            
            return {
                statusCode :400,
                body: JSON.stringify("Error occured" )
            }
        }
};
