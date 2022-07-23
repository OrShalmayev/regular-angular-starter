import { Directive, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[prefetch]',
})
export class PrefetchDirective implements OnInit, AfterViewInit, OnDestroy {
    @Input()
    prefetchMode: ('load' | 'hover' | 'visible')[] = ['visible'];
    @Output()
    prefetch = new EventEmitter<void>();
    observer!: IntersectionObserver;
    loaded = false;

    constructor(private elemRef: ElementRef) {}

    ngOnInit() {
        if (this.prefetchMode.includes('load')) {
            this.prefetchData();
        }
    }

    ngAfterViewInit() {
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.prefetchData();
                    this.observer.disconnect();
                }
            });
        });
        this.observer.observe(this.elemRef.nativeElement);
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    @HostListener('mouseenter')
    onMouseEnter() {
        if (!this.loaded && this.prefetchMode.includes('hover')) {
            this.loaded = true;
            this.prefetchData();
        }
    }

    prefetchData() {
        //@ts-ignore
        if (navigator.connection.saveData) {
            return;
        }
        this.prefetch.next();
    }
}
