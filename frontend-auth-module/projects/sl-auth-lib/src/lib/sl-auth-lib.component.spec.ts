import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlAuthLibComponent } from './sl-auth-lib.component';

describe('SlAuthLibComponent', () => {
  let component: SlAuthLibComponent;
  let fixture: ComponentFixture<SlAuthLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlAuthLibComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlAuthLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
