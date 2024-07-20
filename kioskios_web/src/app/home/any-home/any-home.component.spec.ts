import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyHomeComponent } from './any-home.component';

describe('AnyHomeComponent', () => {
  let component: AnyHomeComponent;
  let fixture: ComponentFixture<AnyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnyHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
