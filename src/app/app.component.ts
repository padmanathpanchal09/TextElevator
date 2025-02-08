import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextFormatterComponent } from "./text-formatter/text-formatter.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiComponent } from "./gemini/gemini/gemini.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TextFormatterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TextElevator';
  // inputText: string = '';
  // showEmojiPicker: boolean = false;


  // toggleEmojiPicker() {
  //   this.showEmojiPicker = !this.showEmojiPicker;
  // }

  // addEmoji(emoji: string) {
  //   // Call the AI API to generate text based on the current inputText
  //   this.generateTextFromAI(this.inputText).then(generatedText => {
  //     this.inputText = generatedText + emoji; // Append the emoji to the generated text
  //     this.showEmojiPicker = false; // Hide the emoji picker after selection
  //   });
  // }

  // // New method to handle AI text generation
  // private async generateTextFromAI(input: string): Promise<string> {
  //   // ... API call logic to generate text based on input ...
  //   // For example, using fetch or axios to call the AI service
  //   return "Generated text based on input"; // Placeholder return value
  // }
}
