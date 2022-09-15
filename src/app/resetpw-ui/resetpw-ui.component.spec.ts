import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpwUIComponent } from './resetpw-ui.component';

describe('ResetpwUIComponent', () => {
  let component: ResetpwUIComponent;
  let fixture: ComponentFixture<ResetpwUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetpwUIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetpwUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
