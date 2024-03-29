const CircularJSON = require('circular-json');
const Redis = require('ioredis');
const redis_user = new Redis(); // Connect to Redis server running on localhost:6379
const redis_user_route_response = new Redis();
const route_response = new Redis();

let user_key:string="users"//default

export  const setup_key=async (key:string)=>{
    
user_key=key
await redis_user.set(key,JSON.stringify({}))
return true
}


export const add_users=async function(user_id:string){
  const pre_data=JSON.parse(await redis_user.get('user'))
  
  pre_data[`${user_id}`]=true;
  const resp=await redis_user.set(user_key,JSON.stringify(pre_data))
  console.log(pre_data)
  console.log("redis_user added")
  return true;
}

// it will remove user and route response
export const remove_users=async function(user_id:string){
    const pre_data=JSON.parse(await redis_user.get('user'))
     delete pre_data[`${user_id}`]
     const resp=await redis_user.set(user_key,JSON.stringify(pre_data))
     await redis_user_route_response.del(user_id)
     return true;
  }
export const get_users=async function(){
    const pre_data=JSON.parse(await redis_user.get(user_key))
    return Object.keys(pre_data);
  }



export const add_user_route_resp=async(user_id:string,response:any)=>{
    // console.log(response)

    const serializedObject = CircularJSON.stringify(response);
   
    await redis_user_route_response.set(user_id,serializedObject);
    console.log("redis_user_route_response added")
    return true;
 }

 export const add_route_resp=async(user_id:string,response:any)=>{
    // console.log(response)
    

    await route_response.hset(user_id,{data:response});
    console.log("redis_user_route_response added")
    return true;
 }

 export const get_route_resp=async(user_id:string)=>{
    return await route_response.hget(user_id,"data")
     
 }

export const get_user_route_resp=async(user_id:string)=>{
    
    const resp= await redis_user_route_response.get(user_id);
   
    const data=JSON.parse(resp)
    console.log(data)
    return data;
     
 }

export const delete_user_route_resp=async(user_id:string)=>{
    await redis_user_route_response.del(user_id)
    return true;
 }
 
