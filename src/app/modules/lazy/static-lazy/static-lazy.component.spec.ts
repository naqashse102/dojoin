import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticLazyComponent } from './static-lazy.component';

describe('StaticLazyComponent', () => {
  let component: StaticLazyComponent;
  let fixture: ComponentFixture<StaticLazyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticLazyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
