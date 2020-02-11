import {
    Component, OnInit, Input, Output, EventEmitter,
    ChangeDetectionStrategy, OnChanges, SimpleChanges, OnDestroy
} from '@angular/core';
import { cloneDeep } from 'lodash';
import { Application } from '../../models/application.data';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { filter, take } from 'rxjs/operators';
import { PipApplicationService } from '../../services/application.service';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationTranslations } from '../../containers/applications-container/application.strings';
// import { update } from 'immutable';

import * as _ from 'lodash';
import { MultiString } from 'iqs-libs-clientshell2-angular';

@Component({
    selector: 'iqs-application-details',
    templateUrl: 'application-details.component.html',
    styleUrls: ['./application-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipApplicationDetailsComponent implements OnInit, OnChanges, OnDestroy {

    private changesSub: Subscription;
    private defaultFormValue: any;
    private subs: Subscription;

    public updateItem: Application = new Application();
    public form: FormGroup;
    public keys = Object.keys;
    public updateTitleText = null;

    @Input() loading = false;
    @Input() error: any = null;
    @Input() ln = 'en';
    @Input() languages: string[] = ['en', 'ru'];

    @Input() set application(val: Application) {
        if (val) {
            this.updateItem = cloneDeep(val);
        } else {
            this.updateItem = new Application();
        }
        if (!this.form) {
            this.createForm();
        }
        if (this.form) {
            this.setFormValueLocale(this.updateItem);
            this.defaultFormValue = this.form.getRawValue();
            this.form.markAsUntouched();
            this.form.markAsPristine();
            this.changesSub = this.form.valueChanges.pipe(filter(() => this.form.dirty), take(1)).subscribe(() => {
                this.change.emit();
            });
        }
    }

    @Output() cancel = new EventEmitter();
    @Output() update = new EventEmitter();
    @Output() delete = new EventEmitter();
    @Output() change = new EventEmitter();
    @Output() changeLang = new EventEmitter();

    public constructor(
        private fb: FormBuilder,
        private Applicationservice: PipApplicationService,
        private translate: TranslateService
    ) {
        this.translate.setTranslation('en', ApplicationTranslations.en, true);
        this.translate.setTranslation('ru', ApplicationTranslations.ru, true);
        this.subs = new Subscription();
    }

    public ngOnChanges(change: SimpleChanges) {
        if (this.loading) { return; }
        if (!this.form) {
            this.createForm();
        }
    }

    public ngOnInit() {
        if (!this.form) {
            this.createForm();
        }
    }

    public ngOnDestroy() {
        this.subs.unsubscribe();
    }

    get localeFormArray() {
        return (<FormArray>this.form.get('translatable')).controls;
    }

    private getFormGroupForLocale() {
        return this.fb.group({
            name: ['', [Validators.required]],
            description: ['']
        });
    }

    // translateField() {}
    private createForm(): void {
        if (this.changesSub) { this.changesSub.unsubscribe(); }

        this.form = this.fb.group({
            id: ['', Validators.required],
            translatable: this.fb.array(this.languages.map(locale => this.getFormGroupForLocale())),
            product: ['', Validators.required],
            group: ['', Validators.required],
            icon: [''],
            copyrights: [''],
            url: [''],
            minVer: [''],
            maxVer: ['']
        });

        this.defaultFormValue = this.form.getRawValue();
        this.subs.add(this.Applicationservice.loading$.subscribe((state) => {
            if (state) {
                this.form.disable();
            } else {
                this.form.enable();
            }
        }));
    }

    public get icon(): string {
        if (!this.form) { return ''; }
        let value = this.form.get('icon').value;
        if (value.indexOf(':') >= 0) {
            const parts = value.split(':');
            if (parts[1] === 'clock-back') { parts[0] = 'webui'; }
            if (parts[0] === 'iqs') { parts[0] = 'iqt'; }
            if (parts[0] === 'icons' || parts[0] === 'webui-icons') { parts[0] = 'webui'; }
            value = parts.join('-');
        }

        return value;
    }

    private setFromArray(item): any[] {
        const arr: any = [];

        for (let i = 0; i < this.languages.length; i++) {
            arr.push({
                name: item && item.name && item.name[this.languages[i]] ? item.name[this.languages[i]] : '',
                description: item && item.description && item.description[this.languages[i]] ? item.description[this.languages[i]] : '',
            });
        }

        return arr;
    }

    private setFormValueLocale(item) {
        this.form.setValue({
            id: item.id || '',
            translatable: this.setFromArray(item),
            product: this.updateItem.product || '',
            group: this.updateItem.group || '',
            icon: this.updateItem.icon || '',
            copyrights: this.updateItem.copyrights || '',
            url: this.updateItem.url || '',
            minVer: this.updateItem.min_ver || '',
            maxVer: this.updateItem.max_ver || ''
        });
    }

    public onCancel(): void {
        this.form.reset(this.defaultFormValue);
        this.cancel.emit();
    }

    public deleteSubmit(): void {
        this.delete.emit(this.updateItem.id);
    }

    public saveSubmit(): void {
        const application = Object.assign(cloneDeep(this.updateItem), this.form.getRawValue());

        application.name = new MultiString();
        application.description = new MultiString();
        for (let i = 0; i < this.languages.length; i++) {
            application.name[this.languages[i]] = application.translatable[i].name;
            application.description[this.languages[i]] = application.translatable[i].description;
        }
        delete application.translatable;

        this.form.disable();
        this.update.emit(application);
    }

    public hasError(field: string, error: string, groupArray?: any, index?: number) {
        if (!this.form) { return false; }
        if (groupArray) {
            const group = this.form.get(groupArray) as FormArray;
            const fieldControl = group.controls[index].get(field);

            return fieldControl.getError(error) && fieldControl.touched;
        } else {
            return this.form.get(field).getError(error) && this.form.get(field).touched;
        }
    }

    public hasMultilanguageHint(field: string, error: string, groupArray?: any, index?: number) {
        if (!this.form) { return false; }

        let currentError = false;
        let currentTouched = false;
        // check current
        if (groupArray) {
            const group = this.form.get(groupArray) as FormArray;
            const fieldControl = group.controls[index].get(field);

            currentError = fieldControl.getError(error);
            currentTouched = fieldControl.touched;
        }

        if (currentError && currentTouched) { return false; }
        if (!currentTouched) { return false; }

        for (let i = 0; i < this.languages.length; i++) {
            if (i === index) { continue; }

            if (groupArray) {
                const group = this.form.get(groupArray) as FormArray;
                const fieldControl = group.controls[i].get(field);

                if (fieldControl.getError(error)) {
                    return true;
                }
            }
        }

        return false;
    }

    public changeLn(event: any): void {
        this.ln = event;
        this.changeLang.emit(this.ln);
    }

    public getErrorMessage(error: any): string {
        return typeof error !== 'object' ? error : error.code ? this.translate.instant(error.code) : error.message;
    }
}
