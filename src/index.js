var emails = {
    "dc4n999@gmail.com":true,
    "dc4n9999@gmail.com":false
    };

function addEmail(){
    var newMail = document.getElementById("mn-new-email").value;
    var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emails[newMail]==undefined && reg.test(newMail)){
        emails[newMail] = true;
        
        refreshList();
        document.getElementById('mn-email-error').style.display="none";
    }
    else{
        document.getElementById('mn-email-error').style.display="block";
    }
    document.getElementById("mn-new-email").value = "";
}

var refreshList = (search,isEnabled)=>{
    var parent = document.getElementById("mn-email-list");
    parent.innerHTML = "";
    Object.keys(emails).map(email => {
        var child = document.createElement("div");
        child.classList.add("mn-list-item");
        child.innerHTML = "<div style='width:20%;display:inline-block;text-align:center;'><input id = '"+email+"' type='checkbox' "+(emails[email]==true?'checked=checked':'unchecked')+"></div><div style='width:60%;display:inline-block;text-align:center;'>"+email+"</div><div style='width:20%;display:inline-block;text-align:center;'><i  class='fa fa-trash' id = 'delete"+email+"'></div>";
        var flag = false;
        if(isEnabled && emails[email]){
            if(search!==undefined && email.includes(search)){
            parent.append(child);
            flag = true;
            }
            else if(search==undefined){
                parent.append(child);
                flag = true;
            }
        }
        else if(isEnabled==undefined || isEnabled==false){
            if(search!==undefined && email.includes(search)){
            parent.append(child);
            flag = true;
            }
            else if(search==undefined){
                parent.append(child);
                flag = true;
            }
        }
        if(flag){
            document.getElementById(email).addEventListener('click', ()=>{
                emails[email]=!emails[email];
            });
            document.getElementById('delete'+email).addEventListener('click', ()=>{
                delete emails[email];
                refreshList();
            });
        }
    });
    if(parent.innerHTML==""){
        parent.innerHTML = "<div style='text-align:center;'>No Email found !!!</div>";
    }
};

function searchEmail () {
    var sVal = document.getElementById("mn-search-email");
    refreshList(sVal.value);
    console.log(sVal.value);
}

refreshList();