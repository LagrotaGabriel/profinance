import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetalhesViewComponent } from "./detalhes-view/component/ts/detalhes-view.component";

const routes: Routes = [
    {
        path: '',
        component: DetalhesViewComponent,
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
export class DetalhesRoutingModule { }