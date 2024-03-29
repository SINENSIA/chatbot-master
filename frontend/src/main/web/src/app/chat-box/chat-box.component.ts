import {Component, OnInit} from '@angular/core';
import {Message} from "../message";
import {MessageService} from "../message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PartialObserver} from "rxjs";
import {mergeNsAndName} from "@angular/compiler";


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent {

  message: Message;
  response: Message[];
  history: Message[][];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) {
                this.history = [];
  }

  ngOnInit() {
    //Iniciamos la conversación automáticamente al entrar
    let mensajeInicial = new Message();
    mensajeInicial.text = "hola";
    this.messageService.sendMessage(mensajeInicial).subscribe(result => {
      this.response = result;
      this.response.map(x => x.owner = "Watson");
      this.history.push(this.response);
    });

  }

  onSubmit(query: string) {

    this.message = new Message();
    this.message.response_type = 'text';
    this.message.text = query;
    this.message.owner = 'Usuario';

    this.history.push([this.message]);

    this.messageService.sendMessage(this.message).subscribe(result => {

      this.response = result;
      this.response.map(x => x.owner = "Watson");
      this.history.push(this.response);
      console.log(this.history);
    });

  }


}
