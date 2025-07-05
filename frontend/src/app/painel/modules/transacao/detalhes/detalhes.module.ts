import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../../../../shared/shared.module';
import { DetalhesViewComponent } from './detalhes-view/component/ts/detalhes-view.component';



@NgModule({
  declarations: [
    DetalhesViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class DetalhesModule { }
