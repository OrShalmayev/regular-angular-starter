import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadersComponent } from './loaders.component';

describe('LoadersComponent', () => {
  let component: LoadersComponent;
  let fixture: ComponentFixture<LoadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
