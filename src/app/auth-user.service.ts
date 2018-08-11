import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { Data } from './data';
import { pipe } from '../../node_modules/@angular/core/src/render3/pipe';
import { map } from 'rxjs/operators';
import { Details } from './details';



@Injectable({
  providedIn: 'root'
})

export class AuthUserService {
  [x: string]: any;
  details= new Details();
  httpOptions = {
    headers : new HttpHeaders ({
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic QUM0MGYwZDNlMzE4MjdiMTc1M2RhYmMxZDY0YmY2ZjUxNzpkODdiOTEzOGNhMTI5MWUxZmMxYTVlZjliN2UyMjJlZA=='
    })
  };
 
 UserName : string = 'AC40f0d3e31827b1753dabc1d64bf6f517';
 Password : string = 'd87b9138ca1291e1fc1a5ef9b7e222ed';
 ServiceId : string =  'IS7e6000a5b6354e0a98851f7d8592e15e';
url = 'https://chat.twilio.com/v2/Services'       //this is our service url 
  constructor(private http : HttpClient) { 
    this.details = JSON.parse(localStorage.getItem("key")); 
  }
  canActivate()
  {
    if(localStorage.getItem('id')===JSON.parse(localStorage.getItem("key")).id)
    {
      return true;
    }
    else{
      false;
    }
  }
  getdata():Observable<any>{
    return this.http.post(this.url,'FriendlyName=Gaurav', this.httpOptions);
  }
  SetData():Observable<any> {
    return this.http.post(this.url,'FriendlyName=Gaurav', this.httpOptions);
  }
  CreateChannel():Observable<any> {
    return this.http.post('https://chat.twilio.com/v2/Services/IS7e6000a5b6354e0a98851f7d8592e15e/Channels', 'UniqueName=General', this.httpOptions);
  }
  DisplayAllChannel():Observable<any> {
    return this.http.get('https://chat.twilio.com/v2/Services/IS7e6000a5b6354e0a98851f7d8592e15e/Channels', this.httpOptions);
  }
  RetrieveChannelId(str):Observable<any>{
    return this.http.get('https://chat.twilio.com/v2/Services/IS7e6000a5b6354e0a98851f7d8592e15e/Channels'+str, this.httpOptions);
  }
  RetrieveChannelName(str):Observable<any>{
    return this.http.get('https://chat.twilio.com/v2/Services/IS7e6000a5b6354e0a98851f7d8592e15e/Channels'+str, this.httpOptions);
  }
  ChannelAddMember(str):Observable<any>{
    return this.http.get('https://chat.twilio.com/v2/Services/IS7e6000a5b6354e0a98851f7d8592e15e/Channels'+str,'&Identity='this.details.email+'&ServiceSid='IS7e6000a5b6354e0a98851f7d8592e15e', this.httpOptions);
  }

  AddChannel(str):Observable<any> {
    return this.http.post('https://chat.twilio.com/v2/Services/IS7e6000a5b6354e0a98851f7d8592e15e/Channels', 'UniqueName='+str, this.httpOptions);
  }
  AddRole():Observable<any> {
    return this.http.post('https://chat.twilio.com/v2/Services/IS7e6000a5b6354e0a98851f7d8592e15e/Roles',  'FriendlyName=Gaurav&Permission=createChannel&Type=deployment', this.httpOptions);
  }
  AddMember():Observable<any>{
    return this.http.post('https://chat.twilio.com/v2/Services/IS7e6000a5b6354e0a98851f7d8592e15e/Channels/CHf2114fa9a13d460ebd18e650f1648434/Members',  'ChannelSid=CHf2114fa9a13d460ebd18e650f1648434&Identity=gauravjes3@gmail.com&ServiceSid=IS7e6000a5b6354e0a98851f7d8592e15e' , this.httpOptions);
  }
  ListAllUsers():Observable<any>{
    return this.http.get('https://chat.twilio.com/v2/Services/IS7e6000a5b6354e0a98851f7d8592e15e/Users', this.httpOptions);
  }
  RetrieveUser():Observable<any>{
    return this.http.get('https://chat.twilio.com/v2/Services/IS7e6000a5b6354e0a98851f7d8592e15e/Users'+this.details.email, this.httpOptions);
  }
  IsSubscribed(str):Observable<any>{
    return this.http.get('https://chat.twilio.com/v2/Services/IS7e6000a5b6354e0a98851f7d8592e15e/Users'+str+'/Channels', this.httpOptions);
  }
  
  SendMessage(str):Observable<any> {
    return this.http.post('https://chat.twilio.com/v2/Services/IS7e6000a5b6354e0a98851f7d8592e15e/Channels/CHf2114fa9a13d460ebd18e650f1648434/Messages',  'ChannelSid=CHf2114fa9a13d460ebd18e650f1648434&ServiceSid=IS7e6000a5b6354e0a98851f7d8592e15e&From='+this.details.email+'&Body='+str, this.httpOptions);
  }
  ShowAllMessages():Observable<any> {
    return this.http.get('https://chat.twilio.com/v2/Services/IS7e6000a5b6354e0a98851f7d8592e15e/Channels/CHf2114fa9a13d460ebd18e650f1648434/Messages', this.httpOptions);
  }
  DetailUser():Observable<any>{
    return this.http.get('https://chat.twilio.com/v2/Services/IS7e6000a5b6354e0a98851f7d8592e15e/Users/'+this.details.email,this.httpOptions);

  }

}