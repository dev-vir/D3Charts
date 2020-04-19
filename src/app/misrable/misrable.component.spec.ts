import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisrableComponent } from './misrable.component';

describe('MisrableComponent', () => {
  let component: MisrableComponent;
  let fixture: ComponentFixture<MisrableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisrableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisrableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
