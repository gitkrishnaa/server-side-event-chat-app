// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import { get,Request,ResponseObject,Response,RestBindings} from '@loopback/rest';
import { inject } from '@loopback/context';
import { eventNames } from 'process';

let users_obj:any={}
let should_send:boolean=false
let i=0;
let response1:any=undefined
let messages_count=0;
export class EventsController {
  constructor() {
    this.myVariable = ()=>{
      console.log(null,"null")
    }; 
  }
  myVariable: any;

  @get('/events')
  async getEvents(
    @inject(RestBindings.Http.REQUEST) request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response) {
  
    console.log("/event route")
    // Set headers
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');
    
    console.log(should_send);
    const users=`user${i++}`
    response.write(`initialize ${users}`);
    response1=response
    users_obj[`${users}`]=response

    for (const key in users_obj) {
      console.log(key)
    }

    response.on('close', () => {
      console.log(users_obj);
      for (const key in users_obj) {
        console.log(key)
      }
      Object.keys(users_obj).forEach((userId) => {
        if (users_obj[userId] === response) {
          delete users_obj[userId];
          console.log(`User ${userId} disconnected`);
        }
      });
      for (const key in users_obj) {
        console.log(key)
      }
      // console.log(users_obj);
      console.log('Client disconnected');

      // Remove the client from the list
    });
    
 
 
    return response;
  }



  @get('/abc')
  abcCall(@inject(RestBindings.Http.RESPONSE) response: Response):string{
    should_send=true;
    // response1.write(i+"messgaes \n\n")
    messages_count++
    for (const key in users_obj) {
      const response_obj=  users_obj[key]
      // console.log(users_obj[key])
      console.log(key)
      response_obj.write(`messgaes ${messages_count} \n\n`)
    }


    return "message sent"
  }

  @get('/close')
  closeEvent(
    @inject(RestBindings.Http.REQUEST) request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response
  ):any {
    const x=request.params
    const user_req=request.query.userid;


    console.log(request.query,"params")
    const user_resp_obj=users_obj[`user${user_req}`]
    if(user_resp_obj!=undefined){
      user_resp_obj.close
    }
    response.send("ok")

  }

}
// console.log("hellokjbnj")

 