const stripTitle=(url)=>{
  const start = url.indexOf("://") + 3;
  const end = url.indexOf(".", start);
  return url.substr(start,end);
}

let ext = typeof browser !== "undefined" ? browser : chrome;

console.log("JCPM: Background script loaded");

const saveCredentialToLocal = async({title,emailOrUser,url,password})=>{
  let result=await ext.storage.local.get("last_credentials");
  let lastCredentials = result.last_credentials || [];
  
  await ext.storage.local.set({
    last_credentials:[...lastCredentials,{title:title,emailOrUser:emailOrUser,url:url,password:password}]
  });
};

// Listen for messages from content.js
ext.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "form_submission") {
    
    let title=stripTitle(message.data.url);
    let userOrEmail = message.data.credentials.email ? message.data.credentials.email : message.data.credentials.username;
    saveCredentialToLocal({title:title,emailOrUser:userOrEmail,url:message.data.url,password:message.data.credentials.password});

    // Here you would trigger your 'save password' logic or notification

    sendResponse({ status: "received" });
  }
  return true; // Indicates we wish to send a response asynchronously
});