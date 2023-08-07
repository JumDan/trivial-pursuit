import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class InserisciAccountService {

  constructor(private http: HttpClient) { }
url = 'client.json'
insertClient(parameters: {}){
  return this.http.post('https://trivial-c3afa-default-rtdb.europe-west1.firebasedatabase.app/'+this.url, parameters)
}
getClient(){
  return this.http.get('https://trivial-c3afa-default-rtdb.europe-west1.firebasedatabase.app/'+this.url)
}

getOneClient(url: string){
  return this.http.get('https://trivial-c3afa-default-rtdb.europe-west1.firebasedatabase.app/'+url)
}

}
