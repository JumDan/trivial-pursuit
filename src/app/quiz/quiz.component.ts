import { Component, OnInit } from '@angular/core';
import { InserisciAccountService } from '../servizi/inserisci-account.service';
import { HomeformComponent } from '../homeform/homeform.component';
import { ServizioTriviaService } from '../servizi/servizio-trivia.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{
  client: any
  naming: any
  point = this.serviziotrivia.point
  constructor(private inserisciAccount: InserisciAccountService,
    private serviziotrivia: ServizioTriviaService,
    private route: ActivatedRoute
    ){}

    //userId = this.homeform.utente
  ngOnInit(): void {
    this.serviziotrivia.userId = this.route.snapshot.paramMap.get('id');
    this.inserisciAccount.getOneClient("/client/"+this.serviziotrivia.userId+'.json')
    .subscribe(data => {
      this.client = data
      this.naming = this.client.name
    })
    


    //console.log()
    /*this.inserisciAccount.getClient()
    .subscribe((data: any) => {
      console.log(this.serviziotrivia.userId)
      //console.log(data)
      this.client = Object.keys(data).map((key) => { return data[key] })
      console.log(this.client)
    })*/
  }


  getInfoClient(){
    
    
  }

}
