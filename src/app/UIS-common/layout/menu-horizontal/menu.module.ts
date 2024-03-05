import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { MenuHorizontalComponent } from "./menu-horizontal/menu-horizontal.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [MenuItemComponent, MenuHorizontalComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    FormsModule,
  ],
  exports: [MenuHorizontalComponent],
})
export class MenuHorizontalModule {}
