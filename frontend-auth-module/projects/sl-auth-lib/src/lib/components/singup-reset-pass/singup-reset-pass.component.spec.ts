import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupResetPassComponent } from './singup-reset-pass.component';

describe('SingupResetPassComponent', () => {
  let component: SingupResetPassComponent;
  let fixture: ComponentFixture<SingupResetPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingupResetPassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingupResetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
