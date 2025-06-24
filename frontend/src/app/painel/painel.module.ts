import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CadastroModule } from './modules/cadastro/cadastro.module';
import { ListagemModule } from './modules/listagem/listagem.module';
import { PainelViewComponent } from './painel-view/ts/painel-view.component';
import { PainelRoutingModule } from './painel.routes';
import { HeaderModule } from './shared/header/header.module';
import { SidebarModule } from './shared/sidebar/sidebar.module';

@NgModule({
  declarations: [
    PainelViewComponent
  ],
  imports: [
    CommonModule,
    ListagemModule,
    CadastroModule,
    RouterModule,
    PainelRoutingModule, 
    HeaderModule, 
    SidebarModule
  ]
})
export class PainelModule { }
