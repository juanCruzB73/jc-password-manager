export const login=async(username,password,ext)=>{
    
    const body={username:username,password:password};
    const response=await fetch('http://localhost:8081/auth/login',{
        method:'POST',
        headers:{ "Content-Type": "application/json" },
        body:JSON.stringify(body)
    });
    if(!response.ok){
      ext.storage.local.set({ auth_token: "" });
      return;
    }
    const data=await response.json();
    ext.storage.local.set({ auth_token: data.token });
};

export const renew=async(ext)=>{
    const token=await ext.storage.local.get("auth_token").then(({ auth_token }) => {
      token = auth_token || "";
    });
    if(token=="")return;
    const response=await fetch(`http://localhost:8081/auth/renew/${token}`,{
        headers:{ "Content-Type": "application/json" },
    });
    if(!response.ok){
      ext.storage.local.set({ auth_token: "" });
      return;
    }
    const data=await response.json();
    ext.storage.local.set({ auth_token: data.token });
};

export const logOut=async(ext)=>{
    ext.storage.local.set({ auth_token: "" });
}