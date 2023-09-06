import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefHomeComponent } from './chefhome.component';

describe('AboutusComponent', () => {
  let component: ChefHomeComponent;
  let fixture: ComponentFixture<ChefHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChefHomeComponent]
    });
    fixture = TestBed.createComponent(ChefHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
