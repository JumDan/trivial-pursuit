import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeformComponent } from './homeform/homeform.component';

const routes: Routes = [
  { path: '', component: HomeformComponent },
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'quiz', component: QuizComponent },
  { path: 'quiz/:id', component: QuizComponent },
  { path: '**', component: NotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
