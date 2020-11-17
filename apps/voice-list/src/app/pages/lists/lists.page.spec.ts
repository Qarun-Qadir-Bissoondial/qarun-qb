import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ANGULAR_IMPORTS } from 'global_testing/angular';
import { ANGULAR_MATERIAL_IMPORTS } from 'global_testing/angular_material';

import { ListsPage } from './lists.page';

xdescribe('ListsPage', () => {
  let component: ListsPage;
  let fixture: ComponentFixture<ListsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsPage ],
      imports: [
        ANGULAR_MATERIAL_IMPORTS,
        ANGULAR_IMPORTS
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
