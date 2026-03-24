import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDropdownComponent } from './login-dropdown';

describe('LoginDropdownComponent', () => {
  let component: LoginDropdownComponent;
  let fixture: ComponentFixture<LoginDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginDropdownComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
