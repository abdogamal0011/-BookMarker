var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var siteId = document.getElementById("sitetId");
var mainBtn = document.getElementById("mainBtn");
var siteContainer;

if (localStorage.getItem("Websites") == null) {
    siteContainer = [];
}
else {
    siteContainer = JSON.parse(localStorage.getItem("Websites"));
    DisplayData();
}

function addData() {

    if ((siteUrlInput.value != "" || siteNameInput.value != "") && validationSiteName() == true && validationSiteUrl() == true) {

        if (siteId.value == "") {
            
                var sites = {
                    siteId: siteContainer.length,
                    siteName: siteNameInput.value,
                    siteUrl: siteUrlInput.value
                }
            
            

            siteContainer.push(sites);




        }
        else { // لو ف اى دى ف ده معناها ان ده للتعديل 
            // Update new site
            for (var i = 0; i < siteContainer.length; i++) {

                if (siteContainer[i].siteId == siteId.value) { // بيسحب الداتا بتاع اى دى معين ع يعرف يحط الجديد 
                    var sites = {
                        siteId: siteId.value,
                        siteName: siteNameInput.value,
                        siteUrl: siteUrlInput.value
                    }
                    siteContainer.splice(siteId.value, 1, sites); // بعد ما خدت الداتا الجديده المتعدلة عليها بيحطها مكان القديمه 
                }
            }
        }


        DisplayData();
        localStorage.setItem("Websites", JSON.stringify(siteContainer))
        clearData();
        mainBtn.innerHTML = "Submit";

    }
    else {

        alert("Please Enter all Data and must be correct to continue")

    }


}

function DisplayData() {
    var item = ``;
    for (var i = 0; i < siteContainer.length; i++) {
        item += ` 

        <div class="row mb-4 p-3">
            <div class="col-4 p-4 ">
            <h3>${siteContainer[i].siteName}</h3>
            <input type="hidden" id="sitetId" name="sitetId" value=${siteContainer[i].siteId}> 
            </div>

            <div class="col-8">
            <a href="${siteContainer[i].siteUrl}" target="_blank">
                <button class="btn btn-primary ">Visit</button>
            </a>
            <button onclick="deleteData(${i})" class="btn btn-danger mr-4">Delete</button>
            <button onclick="updateData(${i})" class="btn btn-success">Update</button>

            </div>
        </div>
                
    
        `

    }
    document.getElementById("bookmarkList").innerHTML = item;
}

function clearData() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function deleteData(index) {
    siteContainer.splice(index, 1);
    DisplayData();
    localStorage.setItem("Websites", JSON.stringify(siteContainer))

}

function updateData(index) {

    siteNameInput.value = siteContainer[index].siteName; // سحبت الداتا 
    siteUrlInput.value = siteContainer[index].siteUrl;
    siteId.value = siteContainer[index].siteId;

    mainBtn.innerHTML = "Update"; //غيرت الزرار لما بدوس ع الفانكشين 
    siteContainer.splice(index, 1); //بيسمع التغيرات الجديده و يسمح القديمه ع يعرف يحط الجديده 

    var newSites = { // بحط الداتا الجديده ف 
        siteId: siteId.value,
        siteName: siteNameInput.value,
        siteUrl: siteUrlInput.value
    }

    siteContainer.push(newSites);
    localStorage.setItem("Websites", JSON.stringify(siteContainer))
}

function validationSiteName() {
    var regex = /^[A-Z][a-z]$/;
    if (regex.test(siteNameInput.value) == true) {

        return true;

    }
    else {

        return false;
    }
}

function validationSiteUrl() {

    var regex = /^(https:\/\/w{3}.)[a-z]/;
    if (regex.test(siteUrlInput.value) == true) {
        return true;
    }
    else {

        return false;

    }
}

// function existSite(){
//     for(var i=0; i<siteContainer.length;i++){
//         if(siteNameInput.value == siteContainer[i].siteName){
//             return False;
//         }
//         else{
//              alert("error");
//              return true;
//         }
//     }
// }
