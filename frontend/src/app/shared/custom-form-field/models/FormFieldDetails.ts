import { AbstractControl } from "@angular/forms";
import { SelectOptions } from "../../../consts/SelectOptions";

export class FormFieldDetails {
    id: string;
    bootstrapColClass: string
    maxLength: string | null;
    index: number | null;
    icone: string | null;
    type: 'text' | 'select' | 'date' | 'number';
    label: string;
    hint: string | null;
    toolTip?: string;
    placeHolder: string | null;
    selectOption: SelectOptions[] | null;
    formControlName: string;
    control: AbstractControl<any, any>;

    constructor(
        id: string,
        bootstrapColClass: string,
        maxLength: string | null,
        index: number,
        icone: string | null,
        type: 'text' | 'select' | 'date' | 'number',
        label: string,
        hint: string | null,
        toolTip: string | undefined,
        placeHolder: string | null,
        selectOption: SelectOptions[] | null,
        formControlName: string,
        control: AbstractControl<any, any>
    ) {
        this.id = id;
        this.bootstrapColClass = bootstrapColClass;
        this.maxLength = maxLength;
        this.index = index;
        this.icone = icone;
        this.type = type;
        this.label = label;
        this.hint = hint;
        this.toolTip = toolTip;
        this.placeHolder = placeHolder;
        this.selectOption = selectOption;
        this.formControlName = formControlName;
        this.control = control;
    }
}