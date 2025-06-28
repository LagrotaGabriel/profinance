import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { TransacaoModule } from './modules/transacao/transacao.module';
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
    TransacaoModule,
    CategoriaModule,
    RouterModule,
    PainelRoutingModule,
    HeaderModule,
    SidebarModule
  ]
})
export class PainelModule { }
