import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sentenceCase",
})
export class SentenceCase implements PipeTransform {
  /**
   * Método para transformar texto a sentence case
   * @param text texto a transformar
   * @param skipUppercase si evita las transformaciones a palabras completamente en mayúscula
   * @returns
   */
  transform(text: string, skipUppercase = false): unknown {
    return !skipUppercase
      ? this.toSentenceCase(text)
      : text
          .split(" ")
          .map((word, index) => {
            if (word.toUpperCase() === word) {
              return word;
            }

            if (index === 0) {
              return this.toSentenceCase(word);
            }

            return word.toLowerCase();
          })
          .join(" ");
  }

  toSentenceCase(word: string) {
    return word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : "";
  }
}
