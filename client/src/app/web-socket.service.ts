import {Injectable} from '@angular/core';
import { io } from "socket.io-client";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  readonly uri:string = "ws://localhost:8080"

  constructor() {
    //this.socket = io(this.uri)
  }

//receive
//   listen(eventName: string) {
//     return new Observable((subscriber) => {
//       this.socket.on(eventName, (data:any) => {
//         subscriber.next(data);
//       })
//     });
//   }

  //send
  // emit(eventName:string, data:any) {
  //   this.socket.emit(eventName, data);
  // }



}
