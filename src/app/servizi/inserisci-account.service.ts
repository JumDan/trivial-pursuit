import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class InserisciAccountService {

  constructor(private http: HttpClient) { }

insertClient(url: string, parameters: {}){
  return this.http.post(url, parameters)
}

}
