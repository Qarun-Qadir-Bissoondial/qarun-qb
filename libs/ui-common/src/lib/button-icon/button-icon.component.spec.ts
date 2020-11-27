import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonIcon } from './button-icon.component';

describe('ButtonIcon', () => {
  let component: ButtonIcon;
  let fixture: ComponentFixture<ButtonIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonIcon ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
