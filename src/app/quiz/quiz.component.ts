import { Component, OnInit } from '@angular/core';
import { InserisciAccountService } from '../servizi/inserisci-account.service';
import { HomeformComponent } from '../homeform/homeform.component';
import { ServizioTriviaService } from '../servizi/servizio-trivia.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{
  client: any
  naming: any
  clientId: any
  question: any
  response: any = []
  responseRandom: any = []
  number: number = 0
  quizform!: FormGroup;
  isComplete = false

  point = this.serviziotrivia.point
  constructor(private inserisciAccount: InserisciAccountService,
    private serviziotrivia: ServizioTriviaService,
    private route: ActivatedRoute
    ){}

    //userId = this.homeform.utente
  ngOnInit(): void {
    this.serviziotrivia.userId = this.route.snapshot.paramMap.get('id');
    this.clientId = this.serviziotrivia.userId
    this.inserisciAccount.getOneClient("/client/"+this.serviziotrivia.userId+'.json')
    .subscribe(data => {
      this.client = data
      this.inserisciAccount.getInfo(`https://opentdb.com/api.php?amount=10&category=${this.client.category}&difficulty=${this.client.level}&type=multiple`)
      .subscribe((data: any) => {
        this.question = Object.keys(data).map((key) => { return data[key] })
        this.question = this.question[1]
        // console.log(this.question)
        for (let index = 0; index < this.question.length; index++) {
          const element = this.question[index];
          this.response[index] = element.incorrect_answers
          this.response[index][3] = element.correct_answer
        }
      })
    })
    this.quizform = new FormGroup({
      resp: new FormControl()
    });
  }
  shuffle(a:any) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
      }
      return a;
  }

  onReset(){
    this.isComplete = false
    this.point = 0
    this.number = 0
  }


  changeQuestion(){
    this.inserisciAccount.getOneClient("/client/"+this.serviziotrivia.userId+'.json')
    .subscribe(data => {
      this.client = data
      this.inserisciAccount.getInfo(`https://opentdb.com/api.php?amount=10&category=${this.client.category}&difficulty=${this.client.level}&type=multiple`)
      .subscribe((data: any) => {
        this.question = Object.keys(data).map((key) => { return data[key] })
        this.question = this.question[1]
        // console.log(this.question)
        for (let index = 0; index < this.question.length; index++) {
          const element = this.question[index];
          this.response[index] = element.incorrect_answers
          this.response[index][3] = element.correct_answer
        }
      })
    })
  }

  onSubmit(value: any, index: any){
    // console.log(this.question)
    // console.log(value);
    this.number++

    if(this.question[index].correct_answer == value){
      this.point = this.point+10
    }

    if(index == 9){
      // console.log('ciaooooooooo');
      this.isComplete = true
      this.inserisciAccount.updateInfo("/client/"+this.clientId+'.json',
      {point: this.point}
      )
      this.changeQuestion()
    }

    //console.log(this.point)

  }


}
