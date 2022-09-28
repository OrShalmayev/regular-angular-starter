import {Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {TAccountPackageDto} from "@models/user";
import {Observable, of} from "rxjs";
import {TPackageType} from "@models/pricing-table";
import {select, Store} from "@ngrx/store";
import {fromAccountStatusSelectors} from "@state/account/status";
import {switchMap, takeUntil, tap} from "rxjs/operators";
import {Actions, ofType} from "@ngrx/effects";
import {planActions} from "@state/plans/plan.actions";
import {IPricingTableStoreState} from "../pricing-table/pricing-table-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services";
import {accountPlanActions} from "@state/account/package";

export interface IChargeBeforeKycState {
    planToPurchase: TAccountPackageDto,
    loading: boolean;
    error: boolean;
}

@Injectable()
export class ChargeBeforeKycStoreService extends ComponentStore<IChargeBeforeKycState> {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private store: Store,
        private actions$: Actions,
    ) {
        super({
            loading: false,
            error: false,
            planToPurchase: null
        });
    }

    // SELECTORS
    readonly loading$: Observable<boolean> = this.select(state => state.loading);
    readonly error$: Observable<boolean> = this.select(state => state.error);
    readonly planToPurchase$: Observable<TAccountPackageDto> = this.select(state => state.planToPurchase);

    // ViewModel for the component
    readonly vm$: Observable<IChargeBeforeKycState> = this.select(
        this.loading$,
        this.error$,
        this.planToPurchase$,
        (loading, error, planToPurchase) => ({
            loading,
            error,
            planToPurchase
        })
    );

    //UPDATERS
    readonly updateLoading = this.updater((state: IChargeBeforeKycState, loading: boolean) => {
        return {
            ...state,
            loading,
        };
    });
    readonly updateError = this.updater((state: IChargeBeforeKycState, error: boolean) => {
        return {
            ...state,
            error,
        };
    });

    readonly updatePlanToPurchase = this.updater((state: IChargeBeforeKycState, planToPurchase: TAccountPackageDto) => {
        return {
            ...state,
            planToPurchase,
        };
    });
    //EFFECTS
    readonly handleLoadOfferedPLanEffect = this.effect(() => {
        return of(this.route.snapshot.queryParams).pipe(
            tap((queryParams: any) => {
                this.updateLoading(true);
                this.updateError(false);
                const {basketId} = queryParams as any;
                this.store.dispatch(planActions.loadOfferedPlanBeforeKyc({basketId}));
            })
        );
    });

    readonly listenForOfferedPlanLoaded = this.effect(() => {
        return this.actions$.pipe(
            ofType(planActions.loadOfferedPlanSuccess),
            tap(({accountPlan}) => {
                this.updatePlanToPurchase(accountPlan);
                this.updateLoading(false);
                this.updateError(false);
            })
        );
    });

    readonly listenForUpdatePlanSuccess = this.effect(() => {
        return this.actions$.pipe(
            ofType(accountPlanActions.updatePlanSuccess),
            tap((data) => {
                setTimeout(() => {
                    this.router.navigate(['/signup']);
                }, 1000);
            })
        );
    });
}

