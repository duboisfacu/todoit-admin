import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelsSelectorComponent } from './travels-selector.component';

describe('TravelsSelectorComponent', () => {
  let component: TravelsSelectorComponent;
  let fixture: ComponentFixture<TravelsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelsSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
