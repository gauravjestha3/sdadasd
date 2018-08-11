import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthUserService } from '../auth-user.service';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModel } from '@angular/forms';
import { Data } from '../data';
import { Alert } from '../../../node_modules/@types/selenium-webdriver';
import { Router } from '../../../node_modules/@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  AddChannel : string;
  SearchChannel : string;
//on click the channel will add on service
  AddButtonClicked(str){
    this.AuthObject.AddChannel(str).subscribe(res => 
      { 
        console.log(res); 
      }),
      err => {
        console.log(err);
      }
  }
  //this search button is used to search an channel if there is already exist an channel it will show channel not found otherwise it will show that channel
  MyVar : string;
  SearchButtonClicked(str){
    this.AuthObject.DisplayAllChannel().subscribe(res => 
      { 
        this.length = res.channels.length;
        for ( let i = 0; i < this.length; i++){
          if (str === res.channels[i].unique_name ) {
            this.MyVar = res.channels[i].unique_name;
            break;        //this break is used because if our element at index 3 ,at first 2 iteration it will show channel not found and at 3 iteration it will so our search value.
            }
          else {
            this.MyVar="Channel not found";
            console.log("Searched Group not found");
          }}
      }),
      err => {
        console.log(err);
      }
  }
  constructor(private AuthObject : AuthUserService, private http : HttpClient,private router:Router) { }
User = new Data;
details=JSON.parse(localStorage.getItem("key"));
ChannelId =[];
ChannelName=[];
channel:string;
  ngOnInit(){
    this.AuthObject.ShowAllMessages().subscribe(res => 
      { 
        this.length = res.messages.length;
        console.log(res);
        for ( let i = 0; i < this.length; i++){ 
          
        this.msgArr[i] = res.messages[i].body +'(' + res.messages[i].from + ')'; }
      }),
      err => {
        console.log(err);
      }
     //if we remove the comment below this line then everytime out code will run it will automatically generate service.
        
        // this.AuthObject.AddUser(this.User.email).subscribe(res => 
        //   { 
        //   console.log(res); 
        //   });
        //   err => {
        //   alert('Welcome Again',);
        //  }
    // this.AuthObject.AddRole().subscribe(res => 
    //   { 
    //     console.log(res); 
    //   }),
    //   err => {
    //     console.log(err);
    //   }
}  
    //   this.AuthObject.SetData().subscribe(res => 
    //   { 
    //     console.log(res); 
    //   }),
    //   err => {
    //     console.log(err);
    //   }
     

    // ButtonClicked() {
    //   this.AuthObject.CreateChannel().subscribe(res => 
    //        { 
    //          console.log(res); 
    //        }),
    //        err => {
    //          console.log(err);
    //        }
    //      }  
    length : number;
    msgArr = [];
    channelArr = [];                     //we show all our channels witht the help of this functions
        Display() {
           this.AuthObject.DisplayAllChannel().subscribe(res => 
                   { 
                     this.length = res.channels.length;
                     for ( let i = 0; i < this.length; i++){ 
                     this.channelArr[i] = res.channels[i].unique_name;} 
                     }),
                     err => {
                       console.log(err);
                     }
              } 
              UserSid:string;
              DetailButtonClicked(){
                this.AuthObject.DetailUser().subscribe(res =>
                {
                  this.UserSid=res.id;
                  this.AuthObject.IsSubscribed(this.UserSid).subscribe(res=>
                  {
                    console.log(res);
                  });
                  err=>{
                    console.log(err);
                  }
                });
                err=>{
                  console.log(err);
                }
              }
          Message:string;
         
    Send() {
          this.AuthObject.SendMessage(this.Message).subscribe(res => 
                    { 
                      console.log(res);
                    }),
                    err => {
                      console.log(err);
                    }
             
          this.AuthObject.ShowAllMessages().subscribe(res => 
                    { 
                      this.length = res.messages.length;
                      console.log(res);
                      for ( let i = 0; i < this.length; i++){ 
                        
                      this.msgArr[i] = res.messages[i].body +'(' + res.messages[i].from + ')'; }
                    }),
                    err => {
                      console.log(err);
                    }
             }
             AllChannel(str)
             {
               this.AuthObject.RetrieveChannelId(str).subscribe(res=>
              {
                this.AuthObject.ChannelAddMember(res.sid).subscribe(res=>
                {
                  alert("you added to this channel successfully")
                }),
                err=>{
                  console.log(err);
                }
              });
              err=>{
                console.log(err);
              }
             }
             SubscribedChannels(){
               this.AuthObject. RetrieveUser().subscribe(res=>
              {
                this.AuthObject.IsSubscribed(res.sid).subscribe(res=>
                {
                  this.length=res.channel.length;
                  for(let i=0;i<this.length;i++)
                  {
                    this.ChannelId[i]=res.channels[i].channel_sid;
                    console.log(this.ChannelId);
                  }
                  for(let i=0;i<this.length;i++)
                  {
                    this.AuthObject.RetreiveChannelName(this.ChannelId[i]).subscribe(res=>
                    {
                      this.ChannelName[i]=res.unique_name;
                      console.log(this.ChannelName[i]);
                    }),
                    err =>{
                      console.log(err);
                    }

                    
                  }
                }),
                err =>{
                  console.log(err);
                }
              }),
              err =>{
                console.log(err);
              }
             }
viewChannelmessage(str){
  this.channel=str;
  localStorage.setItem("channelname",this.channel)
  this.AuthObject.RetreiveChannelId(str).subscribe(res=>
  {
    this.AuthObject.ShowAllMessages().subscribe(res=>
    {
      this.msgArr.length-0;
      this.length=res.messages.length;
      console.log(res);
      for(let i=0;i<this.length;i++){
        this.msgArr[i]=res.messages[i].body+'('+res.messages[i].from+')';

      }
    }),
    err=>{
      console.log(err);
    }
  });
  err=>{
    console.log(err);
  }

}



             signout(){
               localStorage.clear();
               alert("you are sign out!!");
               this.router.navigate(['signin']);
             }
    }
      
