import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "./message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly botUrl: string;

  constructor(private http: HttpClient) {
    this.botUrl = 'http://localhost:8080/send?message=';
  }

  public sendMessage(message: Message): Observable<Message[]> {

    let params = new HttpParams();
    params = params.append('message', message.text);
    return this.http.get<Message[]>(this.botUrl, {params: params});
  }

}
