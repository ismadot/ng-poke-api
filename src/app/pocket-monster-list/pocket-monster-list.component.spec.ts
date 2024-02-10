import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketMonsterListComponent } from './pocket-monster-list.component';

describe('PocketMonsterListComponent', () => {
  let component: PocketMonsterListComponent;
  let fixture: ComponentFixture<PocketMonsterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocketMonsterListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PocketMonsterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
