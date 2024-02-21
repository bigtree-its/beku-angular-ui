import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeformComponent } from './stripeform.component';

describe('StripeformComponent', () => {
  let component: StripeformComponent;
  let fixture: ComponentFixture<StripeformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StripeformComponent]
    });
    fixture = TestBed.createComponent(StripeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
