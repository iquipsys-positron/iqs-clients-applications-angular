import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { findIndex } from 'lodash';
import { PipMediaService } from 'pip-webui2-layouts';

import { Subscription } from 'rxjs';
import { Application, PipUpdateState } from '../../models/application.data';

@Component({
    selector: 'iqs-application-list',
    templateUrl: 'application-list.component.html',
    styleUrls: ['./application-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipApplicationListComponent implements OnInit, OnDestroy {

    private subscription: Subscription = new Subscription();
    public language = 'en';

    @Input() loading = false;
    @Input() state: string = null;
    @Input() applications: Application[];
    @Input() selectId: string;
    @Input() emptyStateActions: any;

    @Input() progressText = 'Loading applications';
    @Input() newApplicationText = 'New application';
    @Input() newApplicationSubText = 'New application product';
    @Input() progressImageUrl = '././assets/progress.svg';
    @Input() emptyImageUrl = '././assets/empty.svg';
    @Input() emptyText = 'Applications not found';
    @Input() emptySubText = '';
    @Input() emptyListUrl = '././assets/menu-empty.svg';

    @Output() selectChange = new EventEmitter();
    @Output() add = new EventEmitter();

    public AppColor = '#024184';

    public constructor(
        public media: PipMediaService,
        private translate: TranslateService
    ) {
        this.language = this.translate.currentLang;
        this.subscription.add(this.translate.onLangChange.subscribe(language => this.language = language.lang));
    }

    public ngOnInit() {

    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public onSelect(event) {
        if (event) { this.selectChange.emit(this.applications[event.index].id); }
    }

    public select(id: string): void {
        if (this.state === PipUpdateState.Edit) { this.selectChange.emit(id); }
    }

    public addApplication() {
        this.add.emit();
    }

    public get index(): number {
        return findIndex(this.applications, { id: this.selectId });
    }

    public getTitle(application: Application, lang: string): string {
        return application && application.name && application.name[lang] ? application.name[lang] : '';
    }
}
