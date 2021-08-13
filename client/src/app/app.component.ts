import { Component, OnInit } from '@angular/core';
import {WebSocketService} from "./web-socket.service";
import { io } from "socket.io-client";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userName:string = "";
  message:string = "";
  messageList: {message:string, userName:string, mine:boolean}[] = [];
  userList: string[] = [];
  socket:any;
  loggedInAs:string = "";

  constructor(private WebSocketService: WebSocketService) {

  }

  ngOnInit() {
    this.socket = io(`localhost:8080` );
    this.socket.on('user-list',(userList:string[])=> {
      this.userList = userList
    })
  }

  setUserName():void {
    if (!this.userName) {
      return
    }
    this.loggedInAs = this.userName
    let name = this.userName
    this.socket = io(`localhost:8080?userName=${name}` );


    this.socket.on('user-list',(userList:string[])=> {
      this.userList = userList
    })

    this.socket.on('message-broadcast', (data:{message:string, userName:string})=> {
      if (data) {
        this.messageList.push({message:data.message, userName: data.userName, mine:false})
      }
    })
    this.userName = ""
  }

  sendMessage(): void {
    if (!this.message || !this.loggedInAs) {
      return
    }
    this.socket.emit('message', this.message);
    this.messageList.push({message: this.message, userName:this.loggedInAs, mine:true})
    this.message = "" ;

  }


}
