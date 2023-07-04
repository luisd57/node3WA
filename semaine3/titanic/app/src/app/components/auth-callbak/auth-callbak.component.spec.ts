import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCallbakComponent } from './auth-callbak.component';

describe('AuthCallbakComponent', () => {
  let component: AuthCallbakComponent;
  let fixture: ComponentFixture<AuthCallbakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthCallbakComponent]
    });
    fixture = TestBed.createComponent(AuthCallbakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
