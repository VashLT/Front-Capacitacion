import { Injectable } from "@angular/core";

@Injectable()
export class PreloaderService {
  private selector = "globalLoader";

  constructor() {}

  hide() {
    const el = this.getElement();
    if (el) {
      el.addEventListener("transitionend", () => {
        el.className = "global-loader-hidden";
      });

      if (!el.className.includes("global-loader-hidden")) {
        el.className += " global-loader-fade-in";
      }
    }
  }

  private getElement() {
    return document.getElementById(this.selector);
  }
}
