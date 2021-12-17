import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelsTableComponent } from './travels-table.component';

describe('TravelsTableComponent', () => {
  let component: TravelsTableComponent;
  let fixture: ComponentFixture<TravelsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
