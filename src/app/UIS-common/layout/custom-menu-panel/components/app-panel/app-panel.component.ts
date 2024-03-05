import { Component } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-app-panel",
  templateUrl: "./app-panel.component.html",
  styleUrls: ["./app-panel.component.scss"],
})
export class AppPanelComponent {
  apps = [
    { name: "App 1" },
    { name: "App 2" },
    { name: "App 3" },
    { name: "App 4" },
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.apps, event.previousIndex, event.currentIndex);
  }
}
