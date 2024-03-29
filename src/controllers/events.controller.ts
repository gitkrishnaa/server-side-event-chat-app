// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import { get,Request,ResponseObject,Response,RestBindings} from '@loopback/rest';
import { inject } from '@loopback/context';
import { eventNames } from 'process';
import {setup_key,add_users,remove_users,add_user_route_resp, get_users, get_user_route_resp, add_route_resp, get_route_resp} from "../redis/redis.js"

const Redis = require('ioredis');
const redis_user = new Redis(); // Connect to Redis server running on localhost:6379
const redis_user_response = new Redis();

let users_obj:any={}
let should_send:boolean=false
let i=0;
let response1:any=undefined
let messages_count=0;




setup_key('user')

export class EventsController {
  constructor() {
    this.myVariable = ()=>{
      console.log(null,"null")
    }; 
  }
  myVariable: any;

  // @get('/events')
  // async getEvents(
  //   @inject(RestBindings.Http.REQUEST) request: Request,
  //   @inject(RestBindings.Http.RESPONSE) response: Response) {
  
  //   console.log("/event route")
  //   // Set headers
  //   response.setHeader('Content-Type', 'text/event-stream');
  //   response.setHeader('Cache-Control', 'no-cache');
  //   response.setHeader('Connection', 'keep-alive');
    
  //   console.log(should_send);
  //   const users=`user${i++}`
  //   response.write(`initialize ${users}`);
  //   response1=response
  //   users_obj[`${users}`]=response

  //   for (const key in users_obj) {
  //     console.log(key);
  //   }

  //   response.on('close', () => {
  //     console.log(users_obj);
  //     delete users_obj[`${users}`]
  //     // for (const key in users_obj) {
  //     //   console.log(key)
  //     // }
  //     // Object.keys(users_obj).forEach((userId) => {
  //     //   if (users_obj[userId] === response) {
  //     //     delete users_obj[userId];
  //     //     console.log(`User ${userId} disconnected`);
  //     //   }
  //     // });
  //     // for (const key in users_obj) {
  //     //   console.log(key)
  //     // }
  //     // console.log(users_obj);
  //     console.log('Client disconnected');

  //     // Remove the client from the list
  //   });
    
 
 
  //   return response;
  // }
  @get('/event')
  async getEvents(
    @inject(RestBindings.Http.REQUEST) request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response) {
  
    console.log("/event route")
    // Set headers
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');
    
    const user="user"+i++
    await add_users(user);
    
    // await add_route_resp(user,response)

    await add_user_route_resp(user,response)
 
   
    response.write('initialize '+user)
  

    response.on('close', async () => {
      await remove_users(user)
      const x=await get_users()
      console.log('user removed,since disconnected')
      console.log(x)
    });
    
 
 
    return response;
  }


  // @get('/abc')
  // abcCall(@inject(RestBindings.Http.RESPONSE) response: Response):string{
  //   should_send=true;
  //   // response1.write(i+"messgaes \n\n")
  //   messages_count++
  //   for (const key in users_obj) {
  //     const response_obj=  users_obj[key]
  //     // console.log(users_obj[key])
  //     console.log(key)
  //     response_obj.write(`messgaes ${messages_count} \n\n`)
  //   }


  //   return "message sent"
  // }
  @get('/abc')
  abc(@inject(RestBindings.Http.RESPONSE) response: Response):string{
    
    



    // for (const key in users_obj) {
    //   const response_obj=  users_obj[key]
    //   // console.log(users_obj[key])
    //   console.log(key)
    //   response_obj.write(`messgaes ${messages_count} \n\n`)
    // }


    return "message sent"
  }

  // @get('/close')
  // closeEvent(
  //   @inject(RestBindings.Http.REQUEST) request: Request,
  //   @inject(RestBindings.Http.RESPONSE) response: Response
  // ):any {
  //   const x=request.params
  //   const user_req=request.query.userid;


  //   console.log(request.query,"params")
  //   const user_resp_obj=users_obj[`user${user_req}`]
  //   if(user_resp_obj!=undefined){
  //     user_resp_obj.close
  //   }
  //   response.send("ok")

  // }

  @get('/check')
    async check(
      @inject(RestBindings.Http.REQUEST) request: Request,
      @inject(RestBindings.Http.RESPONSE) response: Response
    ){
     
      const x=await get_users()
      console.log(x)

      // response.send("ok")
     return "ok"
    }

    @get('/check-resp')
    async check2(
      @inject(RestBindings.Http.REQUEST) request: Request,
      @inject(RestBindings.Http.RESPONSE) response: Response
    ){
     const user_id:any=request.query.user
      // const x=await get_route_resp(user_id)
      const x=await get_user_route_resp(user_id)

      x.write("ok")
      console.log(x)

      // response.send("ok")
     return x
    }
}
// console.log("hellokjbnj")

 