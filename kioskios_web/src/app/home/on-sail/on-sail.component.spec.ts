import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSailComponent } from './on-sail.component';

describe('OnSailComponent', () => {
  let component: OnSailComponent;
  let fixture: ComponentFixture<OnSailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnSailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnSailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
