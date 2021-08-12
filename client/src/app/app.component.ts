import { Component, OnInit } from '@angular/core';
import {WebSocketService} from "./web-socket.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'socket';
  input:string = "";

  constructor(private WebSocketService: WebSocketService) {

  }

  ngOnInit() {
    //connect to socket.io server
    this.WebSocketService.listen('test event').subscribe((data) => {
      console.log(data);
    })
  }

  onClick(){
    this.WebSocketService.listen('sendToAll').subscribe(() => {
      console.log( this.input)
    })
  }

}
