import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardcandidayComponent } from './cardcandiday.component';

describe('CardcandidayComponent', () => {
  let component: CardcandidayComponent;
  let fixture: ComponentFixture<CardcandidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardcandidayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardcandidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
