import { Component, OnInit } from '@angular/core';
import questoes_quizJson from '../../../assets/data/questoes_quiz.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

	titulo:string = "";
	questoes:any;
	questaoSelecionada:any;
	respostas:string[] = [];
	respostaSelecionada:string = "";

	indiceQuestao:number = 0;
	indiceMaximoQuestao:number = 0;
	finalizado:boolean = false;

  constructor() { }

  ngOnInit(): void {
		if(questoes_quizJson.questions) {
			this.finalizado = false;
			this.titulo = questoes_quizJson.title;
			this.questoes = questoes_quizJson.questions;
			this.questaoSelecionada = this.questoes[this.indiceQuestao];

			this.indiceQuestao = 0;
			this.indiceMaximoQuestao = this.questoes.length;
		}
  }

	escolha(valor:string) {
		this.respostas.push(valor);
		this.proximoPasso();
	}

	async proximoPasso() {
		this.indiceQuestao++;
		if(this.indiceMaximoQuestao > this.indiceQuestao) {
			this.questaoSelecionada = this.questoes[this.indiceQuestao];
		} else {
			const resultado:string = await this.verificaResultado(this.respostas);
			this.finalizado = true;
			this.respostaSelecionada = questoes_quizJson.results[resultado as keyof typeof questoes_quizJson.results];
		}
	}

	async verificaResultado(respostas:string[]) {
		const resultado = respostas.reduce((previous, current, i, arr)=>{
			if(arr.filter(item => item === previous).length > arr.filter(item => item === current).length) {
				return previous;
			} else {
				return current;
			}
		});
		return resultado;
	}
}
