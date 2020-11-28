import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ANGULAR_MATERIAL_IMPORTS } from 'global_testing/angular_material';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...ANGULAR_MATERIAL_IMPORTS, ScrollToModule.forRoot()],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
