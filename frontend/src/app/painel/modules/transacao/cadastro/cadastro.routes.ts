import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroViewComponent } from "./cadastro-view/cadastro-view.component";

const routes: Routes = [
    {
        path: '',
        component: CadastroViewComponent, 
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CadastroRoutingModule { }