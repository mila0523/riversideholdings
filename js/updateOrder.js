//This code is used to update details on form
function updateOrderStatus(){
    var ie = document.getElementById("InTitelMod").innerHTML;
    var outBody = document.getElementById("outterModBodyIn");
    var invNumToUpdate = ie.replace("Invoice number: ",'');
    var fott = document.getElementById("footermod");
    var statusSelected = document.querySelector('input[name="status"]:checked').value;
    var deliveryStatus = "";

    if(statusSelected == "Void"){
        deliveryStatus = "Canceled";
    }
    else{
        deliveryStatus = "Delivered";
    }

    //console.log(ie);
    console.log(invNumToUpdate);
    console.log(statusSelected);
    console.log(deliveryStatus);

    /* document.getElementById("alerterlbl").innerHTML = `<i class="fa fa-spinner"></i> 
    Change order status: <p style="color:red;">please select an option</p>`; */


    fetch("https://api.apispreadsheets.com/data/7WmZbgR1ICrqvHzJ/", {
    method: "POST",
    body: JSON.stringify(
        {"data":
        {"status":statusSelected,
         "Delivery status": deliveryStatus,},
        //this determines whch row to update
        "query": `select*from26852whereInvoice_Num='${invNumToUpdate}'`}),
    
    }).then(res =>{
    if (res.status === 201){
        // SUCCESS
    }
    else{
        // ERROR
    }
    })
   


    //after updatig the status, success message is shown on the modal body outterModBodyIn
    outBody.innerHTML = `<center><img src="img/loader.gif" width="30%" ></center>`

    const timerout = setTimeout(loadercircle, 2000);
    
    function loadercircle(){
        //after updatig the status, success message is shown on the modal body outterModBodyIn
        outBody.innerHTML = `<h1 class="text-center">Order: ${invNumToUpdate} Has been Updated!</h1>`
        fott.innerHTML = `<button type="button" onClick="document.location.reload(true)" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
     };
    
    
  }
  
  function formclearer(){
    document.getElementById("formupdateValue").reset();
  }

  function clearStkForm(){
    document.getElementById("submitPrdstkup").reset();
  }