import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ANGULAR_MATERIAL_IMPORTS } from 'global_testing/angular_material';
import { MediumMockedBreakpointObserver } from 'global_testing/mock.breakpointobserver';
import { BreakpointObserver } from '@angular/cdk/layout';
import {LayoutModule} from '@angular/cdk/layout';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...ANGULAR_MATERIAL_IMPORTS, LayoutModule],
      declarations: [AppComponent],
      providers: [
        {provide: BreakpointObserver, useClass: MediumMockedBreakpointObserver}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'QarunQB'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('QarunQB');
  });
});
