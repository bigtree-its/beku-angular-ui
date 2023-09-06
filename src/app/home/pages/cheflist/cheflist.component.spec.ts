import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheflistComponent } from './cheflist.component';

describe('ContactusComponent', () => {
  let component: CheflistComponent;
  let fixture: ComponentFixture<CheflistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheflistComponent]
    });
    fixture = TestBed.createComponent(CheflistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
