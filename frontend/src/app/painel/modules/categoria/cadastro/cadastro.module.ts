import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../../../../shared/shared.module';
import { CadastroViewComponent } from './cadastro-view/component/ts/cadastro-view.component';



@NgModule({
  declarations: [
    CadastroViewComponent
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
export class CadastroModule { }
