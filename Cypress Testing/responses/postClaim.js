
// check if request body on  claim level contains the following combination of key fields or return error

// check if request body on claim lines level contains the following combination of key fields or return error

// One claim can have multiple claim lines

// claims.id , claims.claimNumber and claimLines.claimNumber is a const number throughout

// claimLines.id uses claims.id and increments by 1 decimel point

// claimLines.claimLine also increments for each claim line added in response body

let claimLinesArray = [];
let claimRequest;
let claimLineResult;


function generateClaimResponse(req)
{
    // store claim fields
    claimRequest = req.body.claim[0];
    const {originalOrderID, depot, originalOrder, originalDeliveryDate,
        originalInvoice, customerCode}= claimRequest;
    
    // validate claim fields
    let claimResult = validateClaimFields(claimRequest)
    if( !claimResult) throw new Error('Invalid request. Claim doesn not have valid key fields.');
    
    // iterate over each claim line in claim request and validate
    for (i = 0; i < claimRequest.claimLines.length; i++)
    {
        claimLinesArray.push(claimRequest.claimLines[i]);
        claimLineResult = validateClaimLinesFields(claimLinesArray[i]);
        if(!claimLineResult) throw new Error('Invalid request. Claim line does not have valid key fields.');
    }

     const min = 100000;
     const max = 999999;

     const claimMin = 100;
     const claimMax = 999
 
     idNumber = String(Math.floor(Math.random() * (max - min + 1) + min));
     claimNumber = String(Math.floor(Math.random() * (claimMax - claimMin + 1) + claimMin));

    // generate claim response 
    let claimResponse ={
        id: `${depot},${idNumber}`,
        created: true,
        depot : depot,
        claimNumber : claimNumber,
        claimLines :[]
    };

    // push claim lines into claim response
    for(let i=1; i<= claimLinesArray.length; i++)
    {
        claimResponse.claimLines.push(
            {
                id : `${depot},${idNumber}.${i}`,
                created : true,
                depot : depot,
                claimNumber : claimNumber,
                claimLine : i
            }
        )
    }

    // reset claim lines array
    claimLinesArray = [];

    // return response
    return claimResponse
    
}

function validateClaimFields(fields)
{
    // store claim fields
    const {originalOrderID, depot, originalOrder, originalDeliveryDate,
        originalInvoice, customerCode}= fields;

    // validate claim fields
    if(originalOrderID)
    {
        return true;
    }
    else if (depot && originalOrder && originalDeliveryDate)
    {
        return true;
    }
    else if (depot && originalInvoice && originalDeliveryDate)
    {
        return true;
    }
    else if (depot && customerCode)
    {
        return true;
    }
    else{
        false;
    }

    throw new Error('Invalid request. None of the required claim line field combinations match.');
    
}

function validateClaimLinesFields(fields)
{

    // store claim lines fields
    const {originalLineNumber, sentQuantity, reasonCode, productCode} = fields;

    // validate claim lines fields
    if( originalLineNumber && sentQuantity && reasonCode)
    {
        return true;
    }
    else if (productCode && sentQuantity && reasonCode)
    {
        return true;
    }
    else{
        return false;
    }
}


module.exports = {generateClaimResponse}

