import { Component, OnInit } from '@angular/core';
import quiz_data from "../../../assets/data/quiz_data.json"

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  title : string = ''
  questions : any = ''
  quizResults: any = ''
  
  questionIndex : number = 0
  lastQuestiontIndex : number = 0
  isFinished : boolean = false
  
  currentQuestion : any
  answersStorage : string[] = []
  quizPlayerResult : string = ''
  
  construction() {}

  ngOnInit() : void {
    if(quiz_data) {
      this.isFinished = false
      this.title = quiz_data.title
      this.questions = quiz_data.questions
      this.currentQuestion = this.questions[this.questionIndex]
      this.questionIndex = 0
      this.lastQuestiontIndex = this.questions.length
      this.quizResults = quiz_data.results
    }
  }
  
  handleQuizzQuestions(alternative : string) {
   this.storageAnswers(alternative)
  }
  
  goToNextQuestion() : void {
    if (this.questionIndex === this.lastQuestiontIndex - 1) {
      this.isFinished = true
      this.calculateResult()
    } else {
      this.questionIndex += 1
      this.currentQuestion = this.questions[this.questionIndex]
    }
  }
  
  storageAnswers(alternative : string){
    this.answersStorage.push(alternative)
    this.goToNextQuestion()
  }

  calculateResult() : void {
    const optionsA = this.answersStorage.filter(item => item === 'A').length
    const optionsB = this.answersStorage.filter(item => item === 'B').length

    const calculatedRes =  optionsA > optionsB  
    ? 'A' 
    : 'B'
    
    this.quizPlayerResult = this.quizResults[calculatedRes]
  }

  restart() :void {
    this.isFinished = false
    this.questionIndex = 0
    this.answersStorage = []
  }

}
