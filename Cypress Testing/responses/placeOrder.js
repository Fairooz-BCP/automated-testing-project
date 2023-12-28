
function mockOrderResponse(req){

    const custData = req;
    console.log("customer data", custData);

    return "order received";

}

module.exports = {mockOrderResponse};