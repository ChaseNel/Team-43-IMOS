import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {
  }

  getUser() {
    let url = "https://localhost:44381/api/User";
    return this.http.get(url);
  }

  authUser(user: any) {

    // type User = {
    //   userName: string,
    //   password: string
    // };

    // let users = new Map<'1', User>();
    // users.set('1', {
    //   userName: "Didi321",
    //   password: "Didi123"
    // })

  //   let UserArray: any[] =[];
  //   if(localStorage.getItem("key")){
  //     UserArray = JSON.parse(localStorage.getItem('key'));
  //   }
  //   else{
  //     return UserArray.find(p => p.username === user.userName && p.password === user.password)
  //   }
  }
} 


