import { Component, inject, input, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../gemini.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

// const fontStyles = [
//   { name: "Normal", style: "font-normal", unicodeStyle: "normal" },
//   { name: "Bold", style: "font-bold", unicodeStyle: "𝐛𝐨𝐥𝐝" },
//   { name: "Italic", style: "italic", unicodeStyle: "𝘪𝘵𝘢𝘭𝘪𝘤" },
//   { name: "Bold Italic", style: "font-bold italic", unicodeStyle: "𝒃𝒐𝒍𝒅 𝒊𝒕𝒂𝒍𝒊𝒄" },
//   // Add other styles as needed
// ];


@Component({
  selector: 'app-text-formatter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './text-formatter.component.html',
  styleUrl: './text-formatter.component.css'
})
export class TextFormatterComponent {
  // input = '';  // To bind with the textarea
  inputText: string = '';
  transformedText = '';  // To store the transformed text
  selectedFont = '';

  isDisabled:boolean = true;
// boldSansText ='';
italicSans ='';
script ='';
sans ='';
bold ='';
italic ='';
boldItalicSans ='';
fullWidth ='';
linkedInSans = '';

geminiService:GeminiService = inject(GeminiService)

  transformations: { 
    [key: string]: { [key: string]: string } 
  } = {
    boldSans: {
      'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
      'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
      '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵',
      '!': '‼','@': '＠','#': '＃','$': '＄','%': '％','^': '＾','&': '＆','*': '＊','(': '（',')': '）','_': '＿','+': '＋','=': '＝','{': '｛','}': '｝','[': '［',']': '］','|': '｜',';': '；',':': '：','"': '＂',"'": '＇','<': '＜','>': '＞','?': '？','/': '／','~': '～','`': '｀',

    },
    bold: {
      'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
      'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
      '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗',
      '!': '‼','@': '＠','#': '＃','$': '＄','%': '％','^': '＾','&': '＆','*': '＊','(': '（',')': '）','_': '＿','+': '＋','=': '＝','{': '｛','}': '｝','[': '［',']': '］','|': '｜',';': '；',':': '：','"': '＂',"'": '＇','<': '＜','>': '＞','?': '？','/': '／','~': '～','`': '｀'

    },
    sans: {
      'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦', 'H': '𝖧', 'I': '𝖨', 'J': '𝖩', 'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯', 'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳', 'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷', 'Y': '𝖸', 'Z': '𝖹',
      'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿', 'g': '𝗀', 'h': '𝗁', 'i': '𝗂', 'j': '𝗃', 'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇', 'o': '𝗈', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋', 's': '𝗌', 't': '𝗍', 'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑', 'y': '𝗒', 'z': '𝗓'
    },
    italic: {
      'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍',
      'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧'
    },
    italicSans: {
      'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡',
      'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻'
    },
    boldItalicSans: {
      'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄', 'J': '𝙅', 'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏', 'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕',
      'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞', 'j': '𝙟', 'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩', 'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯',
          '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
    },
    script: {
      'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵',
      'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': 'ℊ', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏'
    },
    fullWidth: {
      'A': 'Ａ', 'B': 'Ｂ', 'C': 'Ｃ', 'D': 'Ｄ', 'E': 'Ｅ', 'F': 'Ｆ', 'G': 'Ｇ', 'H': 'Ｈ', 'I': 'Ｉ', 'J': 'Ｊ', 'K': 'Ｋ', 'L': 'Ｌ', 'M': 'Ｍ', 'N': 'Ｎ', 'O': 'Ｏ', 'P': 'Ｐ', 'Q': 'Ｑ', 'R': 'Ｒ', 'S': 'Ｓ', 'T': 'Ｔ', 'U': 'Ｕ', 'V': 'Ｖ', 'W': 'Ｗ', 'X': 'Ｘ', 'Y': 'Ｙ', 'Z': 'Ｚ',
      'a': 'ａ', 'b': 'ｂ', 'c': 'ｃ', 'd': 'ｄ', 'e': 'ｅ', 'f': 'ｆ', 'g': 'ｇ', 'h': 'ｈ', 'i': 'ｉ', 'j': 'ｊ', 'k': 'ｋ', 'l': 'ｌ', 'm': 'ｍ', 'n': 'ｎ', 'o': 'ｏ', 'p': 'ｐ', 'q': 'ｑ', 'r': 'ｒ', 's': 'ｓ', 't': 'ｔ', 'u': 'ｕ', 'v': 'ｖ', 'w': 'ｗ', 'x': 'ｘ', 'y': 'ｙ', 'z': 'ｚ',
      "0": "０", "1": "１", "2": "２", "3": "３", "4": "４", "5": "５", "6": "６", "7": "７", "8": "８", "9": "９",
      "!": "！","@": "＠","#": "＃","$": "＄","%": "％","^": "＾","&": "＆","*": "＊","(": "（",")": "）","-": "－","_": "＿","=": "＝","+": "＋","{": "｛","}": "｝","[": "［","]": "］","|": "｜",";": "；",":": "：","'": "＇",'"': "＂",",": "，",".": "．","/": "／","<": "＜",">": "＞","?": "？"

    },
      linkedInSans: {
    'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦', 'H': '𝖧', 'I': '𝖨', 'J': '𝖩', 'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯', 'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳', 'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷', 'Y': '𝖸', 'Z': '𝖹',
    'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿', 'g': '𝗀', 'h': '𝗁', 'i': '𝗂', 'j': '𝗃', 'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇', 'o': '𝗈', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋', 's': '𝗌', 't': '𝗍', 'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑', 'y': '𝗒', 'z': '𝗓',
    '0': '𝟢', '1': '𝟣', '2': '𝟤', '3': '𝟥', '4': '𝟦', '5': '𝟧', '6': '𝟨', '7': '𝟩', '8': '𝟪', '9': '𝟫',
    '!': '！', '@': '＠', '#': '＃', '$': '＄', '%': '％', '^': '＾', '&': '＆', '*': '＊', '(': '（', ')': '）',
    '_': '＿', '+': '＋', '=': '＝', '{': '｛', '}': '｝', '[': '［', ']': '］', '|': '｜', ';': '；', ':': '：',
    '"': '＂', "'": '＇', '<': '＜', '>': '＞', '?': '？', '/': '／', '~': '～', '`': '｀',
  },
  };



  // Function to transform text based on selected transformation
  transformText(inputText: string, transformationType: keyof typeof this.transformations): string {
    const transformMap = this.transformations[transformationType];
    return inputText.split('').map(char => transformMap[char] || char).join('');
  }

  // // Update transformedText dynamically whenever input changes
  // onInputChange() {
  //   this.transformedText = this.transformText(this.inputText, 'script');  // You can change this to 'italicSans'
  // }


  // ------------------------------------dotn touch

  private inputTextChanged: Subject<string> = new Subject<string>();

  constructor() {
    // Subscribe to input changes with debounce
    this.inputTextChanged.pipe(
      debounceTime(100), // 300ms debounce time
      distinctUntilChanged() // Only proceed if the input has actually changed
    ).subscribe(inputText => {
      this.onInputChange(this.inputText);
    });


  }

  // updateInputBox(text:string){
    
  //   this.inputText = text;

  // console.warn(text, "updatedinput box");
  
  // }

  // This method is triggered when the user changes the input
  onInputTextChange(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTextChanged.next(input);
  }

  // This method will perform all the transformations
  onInputChange(inputText: string) {
    this.linkedInSans = this.transformText(inputText, 'linkedInSans');
    this.bold = this.transformText(inputText, 'bold');
    this.transformedText = this.transformText(inputText, 'boldSans');
    this.boldItalicSans = this.transformText(inputText, 'boldItalicSans');
    this.italic = this.transformText(inputText, 'italic');
    this.italicSans = this.transformText(inputText, 'italicSans');
    this.sans = this.transformText(inputText, 'sans');
    this.script = this.transformText(inputText, 'script');
    this.fullWidth = this.transformText(inputText, 'fullWidth');

    // Adjust textarea height based on content
    const textarea = document.querySelector('.text-area') as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set new height
  }


  ngAfterViewInit(): void {
    this.geminiService.generatedResponse.subscribe((val)=>{
      console.log(val, "this updated");
      this.onInputChange(val);
      // this.updateInputBox(val);
      // this.onInputTextChange()
      
    })
  }

  


  // onInputChange() {
  //   // this.transformedText = this.transformText(this.inputText, 'script'); 

    

  //   this.bold = this.transformText(this.inputText, 'bold'); 
  //   this.transformedText = this.transformText(this.inputText,'boldSans'); 
  //   this.boldItalicSans = this.transformText(this.inputText, 'boldItalicSans'); 
    
  //   this.italic = this.transformText(this.inputText, 'italic'); 
  //   this.italicSans = this.transformText(this.inputText,'italicSans');  
    
  //   this.sans = this.transformText(this.inputText, 'sans'); 
  //   this.script = this.transformText(this.inputText,'script');  
  //   this.fullWidth = this.transformText(this.inputText, 'fullWidth'); 

  //   const textarea = document.querySelector('.text-area') as HTMLTextAreaElement;
  //   textarea.style.height = 'auto'; // Reset height
  //   textarea.style.height = textarea.scrollHeight + 'px'; // Set new height

  // }



  copy(fontValue:string) {
    let value;
    switch (fontValue) {
      case 'linkedInSans':
        value = this.linkedInSans;
        break;
      case 'bold':
        value = this.bold;
        break;
      case 'boldSans':
        value = this.transformedText;  //its bold sans jus name changed
        break;
      case 'boldItalicSans':
        value = this.boldItalicSans;
        break;
      case 'italic':
        value = this.italic;
        break;
      case 'italicSans':
        value = this.italicSans;
        break;
      case 'script':
        value = this.script;
        break;
      case 'sans':
        value = this.sans;
        break;
      case 'fullWidth':
        value = this.fullWidth;
        break;
      default:
        value = this.inputText;
       
        
    }
   
  // const value = fontValue === 'script' ? this.script : fontValue === 'boldSans' ? this.transformedText : fontValue === 'italicSans' ? this.italicSans :fontValue === 'sans' ? this.sans : this.inputText;
    navigator.clipboard.writeText(value).then(() => {
      alert('Copied to clipboard!');
    });

  }





  showEmojiPicker: boolean = false;


  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(emoji: string) {
    // Call the AI API to generate text based on the current inputText
    this.generateTextFromAI(this.inputText).then(generatedText => {
      this.inputText = generatedText + emoji; // Append the emoji to the generated text
      this.showEmojiPicker = false; // Hide the emoji picker after selection
    });
  }

  // New method to handle AI text generation
  private async generateTextFromAI(input: string): Promise<string> {
    // ... API call logic to generate text based on input ...
    this.geminiService.textGeneration(this.inputText);
    // For example, using fetch or axios to call the AI service
    return "Generated text based on input"; 
  }
 
  
    getData(){
  
      if (this.inputText) {
        
        this.geminiService.textGeneration(this.inputText);
        

      }
  
    }
}


