import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  private socketio = io('http://localhost:3010/');

  constructor() {
    this.socketio.on('connected', (message) => {
      console.log('on connected: ' + JSON.stringify(message));
    });

    this.socketio.on('error', (data: any) => { console.log(data); });
  }

  sendMessage(msg: string): void {
    this.socketio.emit('message', msg);
  }

  onNewMessageReceived(): Observable<any> {
    return new Observable(observer => {
      this.socketio.on('new-message', data => {
        console.log('from server: ' + data);
        observer.next(data.data);
      });
    });
  }
}
