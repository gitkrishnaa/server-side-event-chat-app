// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import { get ,ResponseObject,Response,RestBindings} from '@loopback/rest';
import { inject } from '@loopback/context';
import { eventNames } from 'process';

let user:any=[]
let should_send:boolean=false
let i=0;
let response1:any=undefined
export class EventsController {
  constructor() {
    this.myVariable = ()=>{
    console.log(null,"null")

    }; 
  }
  myVariable: any;

  @get('/events')
  async getEvents(@inject(RestBindings.Http.RESPONSE) response: Response) {
    // Set headers
    console.log("events")
    // console.log(response)
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');
    // Send the response
    // response.send('Hello from LoopBack!');
   console.log(should_send)
   response.write(`initialize`);
   response1=response
   user.push()
    // const intervalId = setInterval(() => {
    //   // response.write(`no data: Total users:${i++} \n\n`);
    //   console.log(should_send);
      
    // }, 2000); // Send updates every second

    
    
    // Return the response
   
      // response.end();
 
    return response;
  }

  @get('/abc')
abcCall(@inject(RestBindings.Http.RESPONSE) response: Response):string{
  should_send=true;
  response1.write("adcs \n\n")
  return "hello dacsfihjsfascsdvd SCdsaafgbfgdvfscda"
}



}
console.log("hellokjbnj")
