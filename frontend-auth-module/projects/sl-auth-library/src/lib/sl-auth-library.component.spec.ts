import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlAuthLibraryComponent } from './sl-auth-library.component';

describe('SlAuthLibraryComponent', () => {
  let component: SlAuthLibraryComponent;
  let fixture: ComponentFixture<SlAuthLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlAuthLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlAuthLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
