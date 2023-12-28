
function mockOrderResponse(req){

    const custData = req;
    let  orderID, orderNumber, depot, orderDate;
    console.log("customer data", custData);

    // order number
    const min = 100000;
    const max = 999999;

    orderNumber = String(Math.floor(Math.random() * (max - min + 1) + min));

    // get current date and time
    orderDate = getCurrentDateTime();
    console.log(orderDate);
    
    // depot
    depot = 'a01';

    // create order ID - combination of depot + order number + date
    orderID = depot + "-" + orderNumber + "-" + getDate(orderDate);
    console.log(orderID)

    // create json with response
    let orderResponse ={
        orderNumber : orderNumber,
        orderID : orderID,
        depot : depot,
        orderDate : orderDate
    }
    
    console.log(orderResponse);

    // return json
    return orderResponse;

}

function getCurrentDateTime(){

    return new Date().toISOString().replace(/Z/, '+00:00');

}

function getDate(orderDate){

    // converts yyyy-mm-dd to yymmdd
    let date = new Date(orderDate);
    let year = date.getFullYear().toString().slice(-2); 
    let month = ('0' + (date.getMonth() + 1)).slice(-2); 
    let day = ('0' + date.getDate()).slice(-2);
    console.log(`${day}${month}${year}`)
    return `${day}${month}${year}`;

}

module.exports = {mockOrderResponse};