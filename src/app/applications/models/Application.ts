import { MultiString } from './MultiString';

export class Application {
    public id?: string;
    public name?: MultiString;
    public description?: MultiString;
    public product?: string;
    public copyrights?: string;
    public url?: string;
    public group?: string;
    public icon?: string;
    public min_ver?: number;
    public max_ver?: number;

    constructor(id?: string, name?: MultiString, description?: MultiString, product?: string, 
            copyrights?: string, url?: string, min_ver?: number, max_ver?: number, group?: string, icon?: string ) {
        this.id = id ? id : '';
        this.name = name ? name : {};
        this.description = description ? description : {};
        this.product = product ? product : '';
        this.copyrights = copyrights ? copyrights : '';
        this.url = url ? url : '';
        this.icon = icon ? icon : '';
        this.group = group ? group : '';
        this.min_ver = min_ver !== null && min_ver !== undefined ? min_ver : null;
        this.max_ver = max_ver !== null && max_ver !== undefined ? max_ver : null;

    }
}
