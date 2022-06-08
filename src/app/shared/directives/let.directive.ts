import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

class NgLetContext<T> {
    $implicit: T | undefined;
    ngLet: T | undefined;

    setData(value: T): void {
        this.$implicit = value;
        this.ngLet = value;
    }
}

@Directive({
    selector: '[ngLet]',
    standalone: true,
})
export class NgLetDirective<T = unknown> implements OnInit {
    constructor(
        private readonly templateRef: TemplateRef<NgLetContext<T>>,
        private readonly _viewContainer: ViewContainerRef
    ) {}
    private readonly _context = new NgLetContext<T>();

    @Input('ngLet') set ngLet(value: T) {
        this._context.setData(value);
    }

    ngOnInit(): void {
        this._viewContainer.clear();
        this._viewContainer.createEmbeddedView(this.templateRef, this._context);
    }

    static ngTemplateContextGuard<T>(dir: NgLetDirective<T>, ctx: unknown): ctx is NgLetContext<NonNullable<T>> {
        return true;
    }
}
