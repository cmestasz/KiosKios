import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterUserRouteComponent } from './filter-user-route.component';

describe('FilterUserRouteComponent', () => {
  let component: FilterUserRouteComponent;
  let fixture: ComponentFixture<FilterUserRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterUserRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterUserRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
