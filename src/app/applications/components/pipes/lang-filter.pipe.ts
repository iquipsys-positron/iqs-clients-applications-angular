import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'langFilter',
    pure: false
})
export class LangFilterPipe implements PipeTransform {
    transform(items: any[], languges: string[], value: string): any {
        if (!items || value === null || value === undefined || !languges) {
            return items;
        }

        return items.filter((v, k) => {
            return languges[k] === value
        })
    }
}