import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFrontComponent } from './company-front.component';

describe('CompanyFrontComponent', () => {
  let component: CompanyFrontComponent;
  let fixture: ComponentFixture<CompanyFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
