//https://docs.google.com/spreadsheets/d/12zyVnZiBhBMcUBVq1VKuMJEj9z8P7TA4-3cX3b__lKQ/edit?usp=sharing

const sheetId2 = '12zyVnZiBhBMcUBVq1VKuMJEj9z8P7TA4-3cX3b__lKQ';
const base2 = `https://docs.google.com/spreadsheets/d/${sheetId2}/gviz/tq?`;
const sheetName2 = 'Client-information';
const query2 = encodeURIComponent('Select *')
const url2 = `${base2}&sheet=${sheetName2}&tq=${query2}`

//DOM function lisatener
const client = []
document.addEventListener('DOMContentLoaded', init,updateClientInfo,findClientToDelete,showclientDtls)
 
/*INT FUNCTION TO PROCCESS ***This function fetches data from the google sheet detailed above
after the data is fethced in the function, it is then changed from an unstructures array 
to a structured array to use in other functoons****/
function init() {
  fetch(url2)
      .then(res => res.text())
      .then(rep => {
          //Remove additional text and extract only JSON:
          const jsonData2 = JSON.parse(rep.substring(47).slice(0, -2));
          //rows of the data retrieved
          const adminArr = jsonData2.table.rows;
          //=============LOG TO CONSOLE========================//
          //console.log(jsonData2);
          //console.log(adminArr);

          var popcards = document.getElementById("cl_list");
          var existcl = document.getElementById("exiRecipient");
          var popclTable = document.getElementById("allClients");

          let nw = [ ];
          let awaitPaymentArr = [ ];

           //check selected values in client add form /existing client
           var exiselect = document.getElementById("exiRecipient");
           var recpAddress = document.getElementById("Recipient Address");
           var clCount = document.getElementById("clientCount");
           var recpientId = document.getElementById("recpID");
  
  
           
          for (let i = 0; i < adminArr.length; i++) {
        
            var Client_Num = adminArr[i].c[0].v;
            var Name =	adminArr[i].c[1].v;
            var Phone =	adminArr[i].c[2].v;
            var Email =	adminArr[i].c[3].v;
            var Address = adminArr[i].c[4].v;
            var ContactP = adminArr[i].c[5].v;

            //contruction a proper structured array of the data
            nw.push({
                "Client_Num": Client_Num,	
                "Name":	Name,
                "Phone": Phone,	
                "Email": Email,	
                "Address": Address,
                "Contact_Person": ContactP
              });

              try{
                existcl.innerHTML += `<option>${Name}</option>`;
                
              }
              catch{

              }
              try{
              popcards.innerHTML += `<div class="col-sm-6">
              <div class="card" style="width: 36rem;">
              <div class="card-header">
                <b>${Client_Num}</b> <br><i class="fa fa-user"></i> Client Name: <b>${Name}</b>
              </div>
              <div class="card-body">
                <h5 class="card-title"><i class="fa-solid fa-phone"></i> <a href="tel:+27${Phone}" class="linkinclientinfo">+27${Phone}</a>&nbsp;&nbsp;&nbsp;
                 <i class="fa-solid fa-envelope"></i> <a href="mailto:${Email}" class="linkinclientinfo">${Email}</a></h5>
                <p class="card-text"><i class="fa-solid fa-location-dot"></i>&nbsp;  ${Address}</p>
                <button type="button" id="dt${Client_Num}" onclick="showclientDtls(this.id)" class="btn btn-primary" data-toggle="modal" data-target="#clDetailsCenter">Details</button>
                <button type="button" id="Ed${Client_Num}" class="btn btn-info" onclick="updateClientInfo(this.id)" data-toggle="modal" data-target="#clientEditCenter">Edit <i class="fa fa-pencil"></i></button>
                <button type="button" id="del${Client_Num}" onclick="findClientToDelete(this.id)" class="btn btn-danger" data-toggle="modal" data-target="#DeleteModal">Remove client <i class="fa-solid fa-user-slash"></i></button>
              </div>
            </div><div>`;

              }
              catch{

              }
              

              try{
                popclTable.innerHTML +=`<tr>
                <td><b>${i+1}</b></td>
                <td class="DontShowmeonsmallScreen">${Client_Num}</td>
                <td>${Name}</td>
                <td class="DontShowmeonsmallScreen">+27${Phone}</td>
                <td class="DontShowmeonsmallScreen">${Email}</td>
                <td class="DontShowmeonsmallScreen">${Address}</td>
                <td><button type="button" id="dt${Client_Num}" onclick="showclientDtls(this.id)" class="btn btn-primary" data-toggle="modal" data-target="#clDetailsCenter"><span class="DontShowmeonsmallScreen">Details</span> &nbsp;<span><i class="fa-regular fa-eye"></i></span></button></td>
                <td><button type="button" id="Ed${Client_Num}" class="btn btn-info" onclick="updateClientInfo(this.id)" data-toggle="modal" data-target="#clientEditCenter"><i class="fa fa-pencil"></i></button></td>
                <td><button type="button" id="del${Client_Num}" onclick="findClientToDelete(this.id)" class="btn btn-danger" data-toggle="modal" data-target="#DeleteModal"><i class="fa-solid fa-trash-can"></i></button></td>
                </tr>`;
              }
              catch{

              }
          }

              //var seectedValue = document.querySelector('input[name="options"]:selected');
              try{
                //get last elelemt of an array
                let lastElement = nw[nw.length - 1].Client_Num;
                document.getElementById("lastarr").innerHTML =  lastElement.substring(3, 7);
                //end//


                var tClients = adminArr.length;
                clCount.innerHTML = `<b style="font-size: 16px;">${tClients}</b>`;
          
                exiselect.addEventListener('change', function(){
                  var result = nw.filter(obj => {
                    return obj.Name === exiselect.value 
                  })

                  recpAddress.value = result[0].Address;
                  recpientId.innerHTML = "(Client ID: "+ result[0].Client_Num+ " )";
                  document.getElementById("recpIdInput").value = result[0].Client_Num;
              });
              }
              catch{
                //
              }

              try{
                exiselect.addEventListener('change', function(){
                  var result = nw.filter(obj => {
                    return obj.Name === exiselect.value 
                  })
                  
                var idintput = document.getElementById("recpIdInput2")

                idintput.value = result[0].Client_Num;
              });
              }
              catch{

              }

              
             

      })        
}

function checkrecipient(){
  var exicl = document.getElementById("existin");
  var newcl = document.getElementById("newClient");

  const exival = document.getElementById("exiRecipient");
  const newval = document.getElementById("newRecipient")

 //var dselectVAl = document.getElementById("statusInMod").value;
 var selectedop= document.querySelector('input[name="options"]:checked');

 var thatopt = document.getElementById("status-progress");
 if(selectedop.value == "EXisting"){
  exicl.style.display = "block";
  exival.setAttribute('name', 'Recipient');
  newcl.style.display = "none";
  newval.setAttribute('name', 'excludet'); 
}
 else if (selectedop.value == "NEw"){
  newcl.style.display = "block";
  newval.setAttribute('name', 'Recipient'); 
  exicl.style.display = "none";
  exival.setAttribute('name', 'excludet'); 

  document.getElementById("Recipient Address").value = " ";
          
 }
}

function clearfrmclients(){
  document.getElementById("formupdateValueClient").reset();
}

var clNum, clName, clPhone, clAddress, clEmail, clContactp;

  clNum = document.getElementById("clNumber1");
  clName = document.getElementById("Client_Name1");
  clPhone = document.getElementById("Phone-Num1");
  clAddress = document.getElementById("Client_Address1");
  clEmail = document.getElementById("Client_Email1");
  clContactp = document.getElementById("ContactP1");


function updateClientInfo(clickedbtn)
{
  let clNumImp = clickedbtn.replace('Ed', '');
  //console.log(clNumImp);

  
  
  fetch(url2)
  .then(res => res.text())
  .then(rep => {
      //Remove additional text and extract only JSON:
      const jsonData2 = JSON.parse(rep.substring(47).slice(0, -2));
      //rows of the data retrieved
      const adminArr = jsonData2.table.rows;
      //=============LOG TO CONSOLE========================//
      //console.log(jsonData2);
      //console.log(adminArr);

      for (let i = 0; i < adminArr.length; i++) {
        
        var Client_Num = adminArr[i].c[0].v;
        var Name =	adminArr[i].c[1].v;
        var Phone =	adminArr[i].c[2].v;
        var Email =	adminArr[i].c[3].v;
        var Address = adminArr[i].c[4].v;
        var ContactP = adminArr[i].c[5].v;

        if(clNumImp == Client_Num)
        {
          clNum.innerHTML = Client_Num;
          clName.value = Name;
          clPhone.value = Phone;
          clEmail.value = Email;
          clAddress.value = Address;
          clContactp.value = ContactP;
        }
        
      }
  });

      
}

function finalupdateexc(){
   var outBody = document.getElementById("outterModBodyIn");
   var fott = document.getElementById("modfootClient1");
   
   var clNumImp = document.getElementById("clNumber1").innerHTML;

  fetch("https://api.apispreadsheets.com/data/87RJ4h2q5QqHBkUg/", {
      method: "POST",
      body: JSON.stringify({"data": 
      {"Email":clEmail.value,
      "Phone":clPhone.value,
      "Address":clAddress.value,
      "Client Name":clName.value,
      "Contact Person":clContactp.value},
      "query": `select*from26972whereClient_Number='${clNumImp}'`}),
     
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
        outBody.innerHTML = `<h2 class="text-center">Client: ${clNumImp} Has been Updated!<br><center><i class="fa-solid fa-user-pen blue"></i></center></h2>`
        fott.innerHTML = `<button type="button" onClick="document.location.reload(true)" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
     };
}

function findClientToDelete(clickedbtnDel){
  var cltoDel = document.getElementById("clientNameid");

  let clNumImpDel = clickedbtnDel.replace('del', '');
  //console.log(clNumImp);

  
  fetch(url2)
  .then(res => res.text())
  .then(rep => {
      //Remove additional text and extract only JSON:
      const jsonData2 = JSON.parse(rep.substring(47).slice(0, -2));
      //rows of the data retrieved
      const adminArr = jsonData2.table.rows;
      //=============LOG TO CONSOLE========================//
      //console.log(jsonData2);
      //console.log(adminArr);

      for (let i = 0; i < adminArr.length; i++) {
        
        var Client_Num = adminArr[i].c[0].v;
        var Name =	adminArr[i].c[1].v;
        var Phone =	adminArr[i].c[2].v;
        var Email =	adminArr[i].c[3].v;
        var Address = adminArr[i].c[4].v;
        var ContactP = adminArr[i].c[5].v;

        if(clNumImpDel == Client_Num)
        {
          cltoDel.innerHTML = Name;

          document.getElementById("useridDel").innerHTML = `<br><i class="fa-solid fa-id-badge" style="font-size:x-large;"></i> <b id="spID">${Client_Num}</b>`;
        }
        
      }

     
      
  });

}

function deleteClient(){
  var outBody = document.getElementById("ModBodyDel");
  var fott = document.getElementById("modDel");
  var heade = document.getElementById("DeleteModalLabel");
  var clNametoDel = document.getElementById("clientNameid").innerHTML;
   
  var cltoDel =document.getElementById("spID").innerHTML;

  fetch(`https://api.apispreadsheets.com/data/87RJ4h2q5QqHBkUg/?query=deletefrom87RJ4h2q5QqHBkUgwhereClient_Number='${cltoDel}'`)
  .then(res=>{
    if (res.status === 200){
      // SUCCESS
    }
    else{
      // ERROR
    }
  });

  //after updatig the status, success message is shown on the modal body outterModBodyIn
  outBody.innerHTML = `<center><img src="img/loader.gif" width="30%" ></center>`;
  heade.innerHTML = `<i class="fa-regular fa-trash-can"></i> &nbsp; Deleting... `;

  const timerout = setTimeout(loadercircle, 2000);
  
  function loadercircle(){
      //after updatig the status, success message is shown on the modal body outterModBodyIn
      outBody.innerHTML = `<h4 class="text-center">Client: ${clNametoDel} Has been Deleted!<br><br><center><i class="fa-solid fa-user-slash redicon"></i></center></h4>`
      fott.innerHTML = `<button type="button" onClick="document.location.reload(true)" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
      heade.innerHTML = `Client deleted from list &nbsp;<i class="fa-solid fa-list-ul"></i>`;
   };
}

function showclientDtls(clickedDtbtn){

  var clmodInner = document.getElementById("clientdtMod");
  var titlmod = document.getElementById("clientdtTitle");
  var clNumID = clickedDtbtn.replace('dt','')

  fetch(url2)
  .then(res => res.text())
  .then(rep => {
      //Remove additional text and extract only JSON:
      const jsonData2 = JSON.parse(rep.substring(47).slice(0, -2));
      //rows of the data retrieved
      const adminArr = jsonData2.table.rows;
      //=============LOG TO CONSOLE========================//
      //console.log(jsonData2);
      //console.log(adminArr);

      for (let i = 0; i < adminArr.length; i++) {
        
        var Client_Num = adminArr[i].c[0].v;
        var Name =	adminArr[i].c[1].v;
        var Phone =	adminArr[i].c[2].v;
        var Email =	adminArr[i].c[3].v;
        var Address = adminArr[i].c[4].v;
        var ContactP = adminArr[i].c[5].v;

        if(clNumID == Client_Num)
        {
          titlmod.innerHTML = `<i class="fa-solid fa-id-badge" style="font-size:x-large;"></i> Id: &nbsp;${Client_Num}`;
          clmodInner.innerHTML =`<h4><i class="fa fa-user"></i> ${Name}</h4>
          <hr>
          <h5><i class="fa fa-phone"></i> ${Phone}</h5>
          <h5><i class="fa fa-envelope"></i> ${Email}</h5>
          <p><i class="fa-solid fa-map-location"></i> ${Address}</p>
          <hr>
          <h5><i class="fa-solid fa-square-phone"></i> Contact Person: <b>${ContactP}<b></h5>
          <button type="button" class="btn btn-success" id="TableRow${Client_Num}" onclick="showOrderPage(this.id)"><i class="fa-solid fa-file-invoice"></i> &nbsp; View Clients Invoices</button>`;
          
        }
        
      }
  });

}

function hideviewtbClients(c){
  var btnid = c;

  var tablebtn = document.getElementById("viewTable");
  var cardsbtn = document.getElementById("viewcards");

  var tableCli = document.getElementById("clienttable");
  var cardsCli = document.getElementById("cl_list");


  if (btnid == "viewTable") {
    cardsCli.style.display = "none";
    tableCli.style.display = "block";
    cardsbtn.style.display = "block";
    tablebtn.style.display = "none";
    
  }
  else if (btnid == "viewcards") {
    tableCli.style.display = "none";
    cardsCli.style.display = "block";
    tablebtn.style.display = "block";
    cardsbtn.style.display = "none";
    
  }
}

try{

const scriptURLp = `https://script.google.com/macros/s/AKfycbzxBqZvnQttmTzoneOhfbI9CErGRSvdax-8nvIyp9-yEez-WbJJ7DryIgF5uDlRFwqw/exec`

const formp = document.forms['payform']
  
    formp.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURLp, { method: 'POST', body: new FormData(formp)})
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message)) 
        onsubmitloader();    
    })
  }
  catch{

  }
  
function onsubmitloader(){
    var title = document.getElementById("titlepaymod");
    var outterBodyp = document.getElementById("moddBodypay");
    var footModp = document.getElementById("modfooterpay");
   
    const timerout = setTimeout(loaderpay, 2000);

    //after updatig the status, success message is shown on the modal body outterModBodyIn
    
    outterBodyp.innerHTML = `<center><img src="img/loader.gif" width="30%" ></center>`
    
    function loaderpay(){
      title.innerHTML = `<i class="fa-regular fa-circle-check green"></i> Success message `
      outterBodyp.innerHTML = `<h1>Payment Successfully added</h1>`;
      footModp.innerHTML = `<button type="button" onClick="document.location.reload(true)" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
    }
}


function failedr(){
  var title = document.getElementById("titlepaymod");
  var outterBodyp = document.getElementById("moddBodypay");
  var footModp = document.getElementById("modfooterpay");
 
  const timerout = setTimeout(loaderpay, 2000);

  //after updatig the status, success message is shown on the modal body outterModBodyIn
  
  outterBodyp.innerHTML = `<center><img src="img/loader.gif" width="30%" ></center>`
  
  function loaderpay(){
    title.innerHTML = `<i class="fa-solid fa-circle-xmark redicon"></i> Error message `
    outterBodyp.innerHTML = `<h1 class="text-center">Payment failed</h1>`;
    footModp.innerHTML = `<button type="button" onClick="document.location.reload(true)" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
  }
}