import { Component, OnInit } from '@angular/core';
import { ServizioTriviaService } from '../servizi/servizio-trivia.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InserisciAccountService } from '../servizi/inserisci-account.service';

@Component({
  selector: 'app-homeform',
  templateUrl: './homeform.component.html',
  styleUrls: ['./homeform.component.css']
})
export class HomeformComponent implements OnInit {
  homeform!: FormGroup;
  constructor(private serviziotrivia: ServizioTriviaService, private insertaccount: InserisciAccountService){}
  listaCategory: any
  data: any

  ngOnInit(): void {
    this.listaCategory = this.serviziotrivia.categories
    this.homeform = new FormGroup({
      name: new FormControl(null, Validators.required),
      level: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required)
    });

    
  }
  onSubmit(){
    this.insertaccount.insertClient('https://trivial-c3afa-default-rtdb.europe-west1.firebasedatabase.app/client.json',
      {name: this.homeform.value.name, level: this.homeform.value.level, category: this.homeform.value.category}
    ).subscribe(data =>{
      console.log(data);
    })
    
  }
  

}
