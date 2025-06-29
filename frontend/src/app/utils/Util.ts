export class Util {

    public static monetaryRegex: any = /^(?:0|0\.\d{1,2}|(?:[1-9]\d{0,6}(?:\.\d{1,2})?))$/;
    public static dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    public static isObjectEmpty(object: any): boolean {
        if (object == null || object == undefined) return true;
        return false;
    }

    public static isNotObjectEmpty(object: any): boolean {
        if (object == null || object == undefined) return false;
        return true;
    }

    public static isEmptyString(string: string): boolean {
        if (string !== null && string !== undefined && string !== '') return false;
        return true;
    }

    public static isNotEmptyString(string: string): boolean {
        if (string != null && string != undefined && string != '') return true;
        return false;
    }

    public static isEmptyNumber(number: number): boolean {
        if (number != null && number != undefined) return false;
        return true;
    }

    public static isNotEmptyNumber(number: number): boolean {
        if (number != null && number != undefined) return true;
        return false;
    }

    public static isSomeAttributeFilled(object: any): boolean {
        if (Object.keys(object).some(k => !!object[k])) return true;
        return false;
    }

    public static getMesAnoAtual(): string {
        let hoje = new Date();
        let year = hoje.getFullYear().toString();
        let monthPreOp = hoje.getMonth() + 1;
        let month = monthPreOp < 10 ? '0' + monthPreOp.toString() : monthPreOp.toString();
        let day = hoje.getDate() < 10 ? '0' + hoje.getDate().toString() : hoje.getDate().toString();
        return (year + '-' + month).toString();
    }

    public static obtemMesAnoPorExtenso(mesAno: string): string {

        let mesAnoSplitted: string[] = mesAno.split('-');

        switch (mesAnoSplitted[1]) {
            case '00':
                return mesAnoSplitted[0];
            case '0':
                return mesAnoSplitted[0];
            case '01':
                return 'Janeiro de ' + mesAnoSplitted[0];
            case '1':
                return 'Janeiro de ' + mesAnoSplitted[0];
            case '02':
                return 'Fevereiro de ' + mesAnoSplitted[0];
            case '2':
                return 'Fevereiro de ' + mesAnoSplitted[0];
            case '03':
                return 'Março de ' + mesAnoSplitted[0];
            case '3':
                return 'Março de ' + mesAnoSplitted[0];
            case '04':
                return 'Abril de ' + mesAnoSplitted[0];
            case '4':
                return 'Abril de ' + mesAnoSplitted[0];
            case '05':
                return 'Maio de ' + mesAnoSplitted[0];
            case '5':
                return 'Maio de ' + mesAnoSplitted[0];
            case '06':
                return 'Junho de ' + mesAnoSplitted[0];
            case '6':
                return 'Junho de ' + mesAnoSplitted[0];
            case '07':
                return 'Julho de ' + mesAnoSplitted[0];
            case '7':
                return 'Julho de ' + mesAnoSplitted[0];
            case '08':
                return 'Agosto de ' + mesAnoSplitted[0];
            case '8':
                return 'Agosto de ' + mesAnoSplitted[0];
            case '09':
                return 'Setembro de ' + mesAnoSplitted[0];
            case '9':
                return 'Setembro de ' + mesAnoSplitted[0];
            case '10':
                return 'Outubro de ' + mesAnoSplitted[0];
            case '11':
                return 'Novembro de ' + mesAnoSplitted[0];
            case '12':
                return 'Dezembro de ' + mesAnoSplitted[0];
        }

        return mesAno;
    }

    public static formataDataDoTipoDateParaStringNoPadraoAmericano(data: Date): string {
        const ano = data.getFullYear();
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const dia = data.getDate().toString().padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }
}