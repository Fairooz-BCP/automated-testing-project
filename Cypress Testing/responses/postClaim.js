
// check if request body on  claim level contains the following combination of key fields or return error

// check if request body on claim lines level contains the following combination of key fields or return error

// One claim can have multiple claim lines

// claims.id , claims.claimNumber and claimLines.claimNumber is a const number throughout

// claimLines.id uses claims.id and increments by 1 decimel point

// claimLines.claimLine also increments for each claim line added in response body


function generateClaimResponse(req)
{
    // validate claim fields
    let result = validateClaimFields(req.body)
    return result;    


    // validate claim lines fields
}

function validateClaimFields(fields)
{
    // store claim fields
    const {originalOrderID, depot, originalOrder, originalDeliveryDate,
        originalInvoice, customerCode}= fields;

    if(originalOrderID)
    {
        return "yipee";
    }
    else if (depot && originalOrder && originalDeliveryDate)
    {
        return "yipee1";
    }
    else if (depot && originalInvoice && originalDeliveryDate)
    {
        return "yipee2";
    }
    else if (depot && customerCode)
    {
        return "yipee3";
    }

    throw new Error('Invalid request. None of the required field combinations match.');
    
}

function validateClaimLinesFields(fields)
{

    // store claim lines fields
    const {originalLineNumber, sentQuantity, reasonCode, productCode} = fields;
    // originalLineNumber, sentQuantity and reasonCode, or
    // productCode, sentQuantity and reasonCode
}


module.exports = {generateClaimResponse}

