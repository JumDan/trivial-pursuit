import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ServizioTriviaService } from '../servizi/servizio-trivia.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InserisciAccountService } from '../servizi/inserisci-account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homeform',
  templateUrl: './homeform.component.html',
  styleUrls: ['./homeform.component.css']
})
export class HomeformComponent implements OnInit, AfterContentInit {


  homeform!: FormGroup;
  constructor(
    private serviziotrivia: ServizioTriviaService, 
    private inserisciAccount: InserisciAccountService,
    private router: Router
    ){
  }
  
  list: any
  listaCategory: any
  data: any
  utente: any

  ngOnInit(): void {
    
    this.inserisciAccount.getInfo('https://opentdb.com/api_category.php?format=json')
    .subscribe((data: any) => {
      this.listaCategory = Object.keys(data).map((key) => { return data[key] })
      this.listaCategory = this.listaCategory[0]
    })

    

    this.homeform = new FormGroup({
      name: new FormControl(null, Validators.required),
      level: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required)
    });
  }

  getCat(){
    
  }

  ngAfterContentInit(): void {
    
  }
  onSubmit(){
    this.inserisciAccount.insertClient(
      {
        name: this.homeform.value.name, 
        level: this.homeform.value.level, 
        category: this.homeform.value.category
      }
    ).subscribe(data =>{
      this.utente = data
      this.changeRoute(data)
    })
  }
  changeRoute(value: any){
    this.router.navigateByUrl('quiz/'+value.name)
  }


  

}
