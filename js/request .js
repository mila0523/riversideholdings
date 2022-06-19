//https://docs.google.com/spreadsheets/d/1B72XHR8ff7JqN9Pj52RBjFFPUt5dmtrTJOaT2dUAeXk/edit?usp=sharing

//==============get invoices=================================//
//google spreedsheet data
//1B72XHR8ff7JqN9Pj52RBjFFPUt5dmtrTJOaT2dUAeXk
const sheetId = '1B72XHR8ff7JqN9Pj52RBjFFPUt5dmtrTJOaT2dUAeXk';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Invoice - records';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`

//DOM function lisatener
const data = []
document.addEventListener('DOMContentLoaded', init, detailstap)
 
/*INT FUNCTION TO PROCCESS ***This function fetches data from the google sheet detailed above
after the data is fethced in the function, it is then changed from an unstructures array 
to a structured array to use in other functoons****/
function init() {
  fetch(url)
      .then(res => res.text())
      .then(rep => {
          //Remove additional text and extract only JSON:
          const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
          //rows of the data retrieved
          const invoiceArr = jsonData.table.rows;
          //=============LOG TO CONSOLE========================//
          //console.log(jsonData);
          //console.log(invoiceArr);

          
          let structuredArr = [ ];

          var populateCards = document.getElementById("cardRows");
          var populateUnpaid = document.getElementById("unPaidcardRows")
          
          for (let i = 0; i < invoiceArr.length; i++) {
        
            var invNumber = invoiceArr[i].c[0].v;
            var invDate = invoiceArr[i].c[1].v;
            var Recipient = invoiceArr[i].c[2].v;
            var RecipientAddress = invoiceArr[i].c[3].v;	
            var Pricesused = invoiceArr[i].c[4].v;	
            var ml330 = invoiceArr[i].c[5].v;	
            var ml500 = invoiceArr[i].c[6].v;	
            var ml750 = invoiceArr[i].c[7].v;	
            var lt1	 = invoiceArr[i].c[8].v;
            var lt5 = invoiceArr[i].c[9].v;	
            var DiscountNotes = invoiceArr[i].c[10].v;	 
            var invoiceTotal = invoiceArr[i].c[11].v;	
            var invstatus = invoiceArr[i].c[12].v;

            var combineItems = `500ml cases: ${ml500}
            <br>750ml cases: ${ml750} 
            <br>1lt cases: ${lt1}
            <br>5lt cases: ${lt5}
            `;
   
            var coloring, iconused;
            if (invstatus == "Paid")
            {
                coloring = "green";
                iconused ="circle-check";
            }
            else if (invstatus == "Awaiting Payment")
            {
                coloring = "redicon";
                iconused ="credit-card";
            }

            populateCards.innerHTML += `
            <div class="col-sm-6">
              <div class="card" style="width: 35rem; height: 50rem;" id="Card${invNumber}">
                <div class="card-body">
                  <h4 class="card-title" id="inNum">Invoice Number: # ${invNumber}</h4>
                  <h5 class="card-subtitle mb-2 text-muted"><i class="fa fa-calendar-days"></i> ${invDate}</h5>
                  <p class="card-subtitle mb-2 text-muted"><i class="fa fa-user"></i>&nbsp;&nbsp; <b>${Recipient}</b></p>
                  <hr></hr>
                  <p class="card-text">Address: <b>${RecipientAddress}</b></h5>
                  <h5 class="card-text">Discouts Applied: <b>${DiscountNotes}</b></h5>
                  <hr></hr>
                  <h4 class="card-text"><i class="fa fa-dolly"></i> Items: ${Pricesused}</h4>
                  <p class="card-text">${combineItems}</p>
                  <hr></hr>
                  <h4 class="card-text"><i class="fa fa-sack-dollar moneygreen"></i> R ${invoiceTotal}</h4><br>
                  <span><button type="button" id="${invNumber}" onclick="detailstap(this.id)" class="btn btn-primary" data-toggle="modal" data-target="#detailCenter">Details</button></span>&nbsp;&nbsp;&nbsp;
                  <span class="${coloring}"><i class="fa fa-${iconused}"></i>&nbsp; ${invstatus}</span>
                </div>
              </div>
            </div>`;

            
            //contruction a proper structured array of the data
            structuredArr.push({
                "invNumber": invNumber, 
                "invDate": invDate,
                "RecipientName": Recipient,
                "RecipientAddress": RecipientAddress,
                "Pricesused": Pricesused,	
                "milLitres330": ml330,
                "milLitres500": ml500,
                "mlLitres750": ml750,
                "litres1": lt1,
                "litres5": lt5,
                "DiscountNotes": DiscountNotes, 
                "invTotal": invoiceTotal,
                "invStatus": invstatus,
            });

          }
                
          var num = structuredArr.length;
          document.getElementById("ordercount").innerHTML = "Riverside Holdngs orders: <b>"+num+" Orders</b>";
          //log array to console to check proper structure
          //console.log("");
          //console.log("Proper Structured Array combining the " + num + " Above");
          //console.log(structuredArr)

         
      })
      
         
}

//populate modals
var modTitle = document.getElementById("ModalLongTitle");
var modBody = document.getElementById("modBody");
var modTotal = document.getElementById("modTotal");
var btnRemind = document.getElementById("btnDangerAl");

function detailstap(clicked){

    modTitle.innerHTML =`Invoice number: ${clicked}`;

    fetch(url)
      .then(res => res.text())
      .then(rep => {
          //Remove additional text and extract only JSON:
          const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
          //rows of the data retrieved
          const invoiceArr = jsonData.table.rows;
          //=============LOG TO CONSOLE========================//
          //console.log(jsonData);
          //console.log(invoiceArr);
 
          for (let i = 0; i < invoiceArr.length; i++) {
        
            var invNumber = invoiceArr[i].c[0].v;
            var invDate = invoiceArr[i].c[1].v;
            var Recipient = invoiceArr[i].c[2].v;
            var RecipientAddress = invoiceArr[i].c[3].v;	
            var Pricesused = invoiceArr[i].c[4].v;	
            var ml330 = invoiceArr[i].c[5].v;	
            var ml500 = invoiceArr[i].c[6].v;	
            var ml750 = invoiceArr[i].c[7].v;	
            var lt1	 = invoiceArr[i].c[8].v;
            var lt5 = invoiceArr[i].c[9].v;	
            var DiscountNotes = invoiceArr[i].c[10].v;	 
            var invoiceTotal = invoiceArr[i].c[11].v;	
            var invstatus = invoiceArr[i].c[12].v;

            var combineItems = `500ml cases: ${ml500}
            <br>750ml cases: ${ml750} 
            <br>1lt cases: ${lt1}
            <br>5lt cases: ${lt5}
            `;
   
            var coloring, iconused, detailtext;
            if (invstatus == "Paid")
            {
                coloring = "green";
                iconused ="circle-check";
                detailtext = "The order has been complete and payed for!"
                var addDangerBtn = " ";
            }
            else if (invstatus == "Awaiting Payment")
            {
                coloring = "redicon";
                iconused ="credit-card";
                detailtext = Recipient +" Has not payed for the order! <br> Status: <b>Not delivered</b>";
                var addDangerBtn = `<button type="button" class="btn btn-danger">Send Reminder</button>`;
            }

            if(clicked == invNumber)
            {
                
                modBody.innerHTML = `
                <img src="img/Riverside_OG.png" width="20%" class="logorounded"/><br><br><br>
                <h5 class="card-subtitle mb-2 text-muted"><i class="fa fa-calendar-days"></i> ${invDate}</h5>
                <p class="card-subtitle mb-2 text-muted"><i class="fa fa-user"></i>&nbsp;&nbsp; <b>${Recipient}</b></p>
                <p class="card-text"><i class="fa fa-location-dot"></i>&nbsp;&nbsp; <b>${RecipientAddress}</b></h5>
                <hr>
                <h4><i class="fa fa-dolly"></i>&nbsp; Items:</h4><p class="card-text">${combineItems}</p>
                <hr>
                <p>${detailtext}</p>
                <hr>
                <span class="${coloring}"><i class="fa fa-${iconused}"></i>&nbsp; ${invstatus}</span>
                `;

                modTotal.innerHTML = "Total: R" + invoiceTotal;

                btnRemind.innerHTML = addDangerBtn;
            }

          }
       
                
      })
}

//Card${invNumber}

function scrollToItem(){
    var searchText = document.getElementById("SerachVal").value;
    const element = document.getElementById("Card"+searchText);
    element.scrollIntoView();

    element.style = `box-shadow:0px 0px 16px 6px #3586a6;
    transition: ease-in 0.3s;`;

    const myTimeout = setTimeout(removefocus, 4000);

    function removefocus() {
        element.style = " ";
    }


}