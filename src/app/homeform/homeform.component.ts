import { Component, OnInit } from '@angular/core';
import { ServizioTriviaService } from '../servizi/servizio-trivia.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InserisciAccountService } from '../servizi/inserisci-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeform',
  templateUrl: './homeform.component.html',
  styleUrls: ['./homeform.component.css']
})
export class HomeformComponent implements OnInit {


  homeform!: FormGroup;
  constructor(
    private serviziotrivia: ServizioTriviaService, 
    private insertaccount: InserisciAccountService,
    private router: Router
    ){}
  listaCategory: any
  data: any
  utente: any

  ngOnInit(): void {
    this.listaCategory = this.serviziotrivia.categories
    this.homeform = new FormGroup({
      name: new FormControl(null, Validators.required),
      level: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required)
    });

    
  }
  onSubmit(){
    this.insertaccount.insertClient(
      {name: this.homeform.value.name, level: this.homeform.value.level, category: this.homeform.value.category}
    ).subscribe(data =>{
      this.utente = data
      //console.log(data);
      this.changeRoute(data)
    })
  }
  changeRoute(value: any){
    // console.log();
    this.router.navigateByUrl('quiz/'+value.name)
    //this.serviziotrivia.userId = value.name
  }


  

}
