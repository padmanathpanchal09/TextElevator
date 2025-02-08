import { Component, inject } from '@angular/core';
import { GeminiService } from '../../gemini.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gemini',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gemini.component.html',
  styleUrl: './gemini.component.css'
})
export class GeminiComponent {

  myData!:string; 
  prompt:string = '';

  geminiService:GeminiService = inject(GeminiService)

  // constructor(private geminiService: GeminiService) { }

  getData(){

    if (this.prompt) {
      
      this.geminiService.textGeneration(this.prompt);
      this.prompt = ''
    }

  }


}
