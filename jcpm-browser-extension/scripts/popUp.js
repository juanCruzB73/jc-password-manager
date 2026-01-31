import { login,renew,logOut } from "./login.js";

let ext = typeof browser !== "undefined" ? browser : chrome;
let menuContainer=document.getElementsByClassName('menuContainer')[0];
let loginContainer=document.getElementsByClassName('loginContainer')[0];
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let titleField = document.getElementById("titleField");
let userEMailField = document.getElementById("userEMailField");
let urlField = document.getElementById("urlField");
let passwordField = document.getElementById("passwordField");
let saveButton = document.getElementById("saveButton");
let delButton = document.getElementById("delButton")
const loginButton=document.getElementById('loginButton');
const logOutButton=document.getElementById('logOutButton');

let token="";

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload);
}

//load login or index depending on token
const displayWindows=()=>{
  console.log("firing");
  
  ext.storage.local.get("auth_token").then(({ auth_token }) => {
    token = auth_token;
  }).then(()=>{
    if(!token){
      menuContainer.style.display="none";
      loginContainer.style.display="block";
    }else{
      menuContainer.style.display="block";
      loginContainer.style.display="none";
    }
  }).catch(()=>{console.log("error")});
};

displayWindows();

loginButton.addEventListener("click", async(e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  await login(username, password,ext);
  const { auth_token } = await ext.storage.local.get("auth_token");
  token = auth_token || "";
  displayWindows();
});

logOutButton.addEventListener("click", async(e) => {
  e.preventDefault();
  await logOut(ext);
  displayWindows();
});

const handleNextpreviousVisivility=(min,max,index)=>{
  if(index>min && index<max){
    previous.style.display="block";
    next.style.display="block";
  }
  if(index==min){
    previous.style.display="none";
    next.style.display="block";
  };
  if(index==max){
    previous.style.display="block";
    next.style.display="none";
  }
}

const handlePagination = (min, max, index, action) => {
  if (action === "previous") {
    return index > min ? index - 1 : index;
  } else {
    return index < max ? index + 1 : index;
  }
};


const handleInputsValue=(credential)=>{
  titleField.value=credential.title
  userEMailField.value = credential.emailOrUser;
  urlField.value = credential.url;
  passwordField.value = credential.password;;
}

const deleteCredential=async(index,credentials)=>{
  credentials.splice(index,1);
  await ext.storage.local.set({
    last_credentials: credentials
  });
  
  if (index >= credentials.length) {
    index = credentials.length - 1;
  }

  return index;
};
const delFromState=async(index)=>{
    
    index=await deleteCredential(index,credentials);
    maxIndex=credentials.length-1;
    
    if (credentials.length === 0) {
      userEMailField.value = "";
      urlField.value = "";
      passwordField.value = "";
      previous.style.display = "none";
      next.style.display = "none";
      return;
    };

    credential=credentials[index];
    handleNextpreviousVisivility(minIndex,maxIndex,index);
    handleInputsValue(credential);
};

  let credentials=[];
  let minIndex;
  let maxIndex;
  let index;
  let credential

window.addEventListener("DOMContentLoaded", (event) => {
  
  ext.storage.local.get("last_credentials").then(({ last_credentials }) => {
    for(let i=0;i<last_credentials.length;i++){
      credentials.push({...last_credentials[i],index:i});
    };
    
    minIndex=0;
    maxIndex=credentials.length-1;
    index=credentials.length-1;

    handleNextpreviousVisivility(minIndex,maxIndex,index)

    credential=credentials[index];
    handleInputsValue(credential);
    
    next.addEventListener("click",()=>{
      index=handlePagination(minIndex,maxIndex,index,"next");
      credential=credentials[index];
      handleInputsValue(credential)
      handleNextpreviousVisivility(minIndex,maxIndex,index)
    })

    previous.addEventListener("click",()=>{
      index=handlePagination(minIndex,maxIndex,index,"previous");
      credential=credentials[index];
      handleInputsValue(credential)
      handleNextpreviousVisivility(minIndex,maxIndex,index)
    })
    
  });

  saveButton.addEventListener("click", async () => {
    try {
      const payload = parseJwt(token);
      let user=payload.userId
      const bodyData = {
        title: titleField.value,
        email: userEMailField.value,
        password: passwordField.value,
        website: urlField.value,
        user: user
      };
    
      const response = await fetch("http://localhost:8081/api/v1/create/credential", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
      });
    
      if (response.ok) {
        await delFromState(index);
      }
    } catch (err) {
      console.log(err);
    }
  });


  delButton.addEventListener("click", () => delFromState(index));

}, true);


