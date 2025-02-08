import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private apiUrl = 'https://api.gemini.com/v1/'; // Gemini API base URL
  apiKey:string ='AIzaSyA6osRyveqlrJ9IMyBuQ8mSFrKtWWB_gTs';

  generatedResponse = new BehaviorSubject<string>('');

  private generativeAi!:GoogleGenerativeAI;

  constructor(private http:HttpClient) {
    this.generativeAi = new GoogleGenerativeAI(this.apiKey)


   }
   

   async textGeneration(prompt:string){

    // const model = this.generativeAi.getGenerativeModel({model:'gemini-pro'});
    const model = this.generativeAi.getGenerativeModel({model:'gemini-2.0-flash-exp'});


    
    const result = await model.generateContent(prompt);
    
    // console.log(result);
    const response =  await result.response;
    const text = response.text();

    this.generatedResponse.next(text);
    console.log(text);
    // return text;
    
   }



}
