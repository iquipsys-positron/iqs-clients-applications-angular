import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';

import { IqsAskDialogComponent } from 'iqs-libs-clientshell2-angular';

import { PipMediaService, MediaMainChange, PipSidenavService } from 'pip-webui2-layouts';
import { PipNavService } from 'pip-webui2-nav';
import { Application, ApplicationDataService, PipUpdateState } from '../../models/application.data';
import { PipApplicationService } from '../../services/application.service';
import { ApplicationTranslations } from './application.strings';
import { filter, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'iqs-applications-container',
    templateUrl: './applications-container.component.html',
    styleUrls: ['./applications-container.component.scss']
})
export class ApplicationsContainerComponent implements OnInit, OnDestroy {

    public applications$: Observable<Application[]>;
    public loading$: Observable<boolean>;
    public error$: Observable<any>;
    public updateState$: Observable<string>;
    public selectId$: Observable<string>;
    public selectApplication$: Observable<Application>;
    public isSingle: boolean;
    public languages: string[] = ['en', 'ru'];
    public ln = 'en';
    private _applications: Application[];
    private _state: string;
    public isSingle$: BehaviorSubject<boolean>;
    public isChanged = false;
    public emptyApplication: Application;
    private subscibtions: Subscription = new Subscription();
    public emptyStateActions: any[];
    private isBackIcon = false;

    constructor(
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private navService: PipNavService,
        private cd: ChangeDetectorRef,
        public media: PipMediaService,
        private router: Router,
        private data: ApplicationDataService,
        public sidenav: PipSidenavService,
        private applicationService: PipApplicationService,
        private translate: TranslateService,
        private ngZone: NgZone
    ) {

        this.sidenav.active = true;
        this.error$ = this.applicationService.error$;
        this.loading$ = this.applicationService.loading$;
        this.applications$ = this.applicationService.applications$;
        this.updateState$ = this.applicationService.updateState$;
        this.selectId$ = this.applicationService.selectId$;
        this.selectApplication$ = this.applicationService.selectApplication$;

        this.emptyApplication = this.applicationService.getNewApplication();

        this.translate.setTranslation('en', ApplicationTranslations.en, true);
        this.translate.setTranslation('ru', ApplicationTranslations.ru, true);


        this.subscibtions.add(combineLatest(
            this.applicationService.selectApplication$.pipe(filter(p => !!p)),
            this.applicationService.updateState$,
            this.applicationService.isSingle$,
        ).pipe(
            debounceTime(10)
        ).subscribe(([application, state, isSingle]) => {
            this.ngZone.run(() => this.router.navigate([], {
                queryParams: { application_id: application.id, state: state, single: isSingle },
                queryParamsHandling: 'merge'
            }));
        }));


        this.navService.showBreadcrumb({
            items: [
                { title: 'APP_BREADCRUMB_TEXT' }
            ]
        });

        this.emptyStateActions = [
            { title: this.translate.instant('APP.ADD.BUTTON.TEXT'), action: () => { this.initAdd(); } }
        ];
    }

    public ngOnInit() {
        const isMobile = this.media.isMainActive('xs') || this.media.isMainActive('sm');
        const state = this.activatedRoute.snapshot.queryParams['state'];

        this.isSingle = !isMobile ? !!this.activatedRoute.snapshot.queryParams['single'] : false;
        this.isSingle$ = new BehaviorSubject(this.isSingle);
        this.subscibtions.add(this.isSingle$.subscribe(single => {
            this.isSingle = single;
            this.changeNavWithState();
        }));
        this.isSingle$.next((isMobile) && (state === PipUpdateState.Create || state === PipUpdateState.Edit) ? true : this.isSingle);

        this.subscibtions.add(this.applications$.subscribe(app => {
            this._applications = app;
        }));
        this.subscibtions.add(this.updateState$.subscribe(st => {
            this._state = st;
            this.changeNavWithState();
        }));

        this.applicationService.application();
        this.subscibtions.add(this.media.asObservableMain().subscribe((change: MediaMainChange) => {
            if (!(change.aliases.includes('xs') || change.aliases.includes('sm'))) {
                this.isSingle$.next(false);
                if (this.isBackIcon) { this.restoreIcon(); }
            }

            if ((change.aliases.includes('xs') || change.aliases.includes('sm'))
                && (this._state === PipUpdateState.Create || this._state === PipUpdateState.Edit)) {
                this.isSingle$.next(true);
            }

            this.cd.detectChanges();
        }));
    }

    public ngOnDestroy() {
        this.subscibtions.unsubscribe();
    }

    public changeLn(ln: string) {
        this.ln = ln;
    }

    public get state(): string {
        return this._state;
    }

    public openDialog(id: string): void {
        this.dialog.open(IqsAskDialogComponent, {
            width: '450px',
            data: {
                title: 'APP.DELETE.DIALOG.TITLE',
                content: [
                    this.translate.instant('APP.DELETE.DIALOG.MESSAGE')
                ],
                actions: {
                    no: {
                        text: 'APP.DELETE.DIALOG.BUTTON.CANCEL',
                        returnValue: false
                    },
                    yes: {
                        text: 'APP.DELETE.DIALOG.BUTTON.OK',
                        returnValue: true,
                        color: 'warn'
                    }
                },
                initFocusActionKey: 'no'
            }
        }).afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                // DO SOMETHING
                this.delete(id);
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    private onSelectById(id: string): void {
        this.applicationService.applicationSelect(id);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(true);
            this.isBackIcon = true;
            this.navService.showNavIcon({
                icon: 'arrow_back',
                action: () => {
                    if (this._state === PipUpdateState.Create || this._state === PipUpdateState.Edit) {
                        this.select(null);
                    } else {
                        this.isSingle$.next(false);
                        this.restoreIcon();
                    }
                }
            });
        }
    }

    private restoreIcon() {
        this.isBackIcon = false;
        this.navService.showNavIcon({
            icon: 'menu',
            action: () => {
                this.sidenav.toggleOpened();
            }
        });
    }

    public select(id: string): void {
        if (this._state === PipUpdateState.Create || this._state === PipUpdateState.Edit) {
            this.dialog.open(IqsAskDialogComponent, {
                width: '450px',
                data: {
                    title: 'APP.EDIT.CANCEL.DIALOG.TITLE',
                    content: [
                        this.translate.instant('APP.EDIT.CANCEL.DIALOG.MESSAGE')
                    ],
                    actions: {
                        no: {
                            text: 'APP.EDIT.CANCEL.DIALOG.BUTTON.CANCEL',
                            returnValue: false
                        },
                        yes: {
                            text: 'APP.EDIT.CANCEL.DIALOG.BUTTON.OK',
                            returnValue: true,
                            color: 'warn'
                        }
                    },
                    initFocusActionKey: 'no'
                }
            }).afterClosed().subscribe((accept: boolean) => {
                if (accept) {
                    // DO SOMETHING
                    this.cancel();
                    this.onSelectById(id);
                } else {
                    // DO SOMETHING ELSE
                }
            });
        } else {
            this.onSelectById(id);
        }
    }

    public initAdd() {
        this.applicationService.applicationChangeState(PipUpdateState.Create);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(true);
            this.isBackIcon = true;
            this.navService.showNavIcon({
                icon: 'arrow_back',
                action: () => this.select(null)
            });
        }
    }

    public cancel() {
        this.applicationService.applicationChangeCancel(this._applications);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(false);
        }
        if (this.isBackIcon) {
            this.restoreIcon();
        }
    }

    public update(application: Application) {
        this.applicationService.ApplicationUpdates(application);
    }

    public create(application: Application) {
        this.applicationService.applicationCreate(application);
    }

    public delete(id: string) {
        this.applicationService.applicationDelete(id);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(false);
        }
    }

    public change() {
        this.applicationService.applicationChangeState(PipUpdateState.Edit);
    }

    public changeNavWithState() {
        const isMobile = this.media.isMainActive('xs') || this.media.isMainActive('sm');
        if (!this.isSingle && this.isBackIcon) {
            this.restoreIcon();
        }
        let title: string;
        if (!isMobile) {
            switch (this._state) {
                case PipUpdateState.Edit:
                    title = !this.isSingle ? 'APP_BREADCRUMB_TEXT' : 'APP.UPDATE';
                    break;
                case PipUpdateState.View:
                    title = 'APP_BREADCRUMB_TEXT';
                    break;
                case PipUpdateState.Create:
                    title = 'APP.CREATE';
                    break;
                default:
                    title = 'APP_BREADCRUMB_TEXT';
            }
            this.navService.showBreadcrumb({
                items: [
                    { title: title }
                ]
            });
        } else {
            if (this.isSingle && !this.isBackIcon) {
                this.isBackIcon = true;
                this.navService.showNavIcon({
                    icon: 'arrow_back',
                    action: () => {
                        if (this._state === PipUpdateState.Edit || this._state === PipUpdateState.Create) {
                            this.select(null);
                        } else {
                            this.cancel();
                        }
                    }
                });
            }
            switch (this._state) {
                case PipUpdateState.Edit:
                    title = !this.isSingle ? 'APP_BREADCRUMB_TEXT' : 'APP.UPDATE';
                    break;
                case PipUpdateState.View:
                    title = 'APP_BREADCRUMB_TEXT';
                    break;
                case PipUpdateState.Create:
                    title = 'APP.CREATE';
                    break;
                default:
                    title = 'APP_BREADCRUMB_TEXT';
            }
            this.navService.showBreadcrumb({
                items: [
                    { title: title }
                ]
            });
        }

    }

}
