import { ExampleService } from './example.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  fromServer!: string;

  constructor(private service: ExampleService) { }

  ngOnInit(): void {
    this.service.onNewMessageReceived().subscribe((msg) => {
      this.fromServer = msg;
    });
  }

  sendMessage(msg: string): void {
    console.log(msg);
    this.service.sendMessage(msg);
  }

}
