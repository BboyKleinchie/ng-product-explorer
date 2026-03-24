import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { describe, it, expect, beforeEach } from 'vitest';

import { MaterialIconComponent } from './material-icon';

describe('MaterialIconComponent', () => {
  let component: MaterialIconComponent;
  let fixture: ComponentFixture<MaterialIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialIconComponent);
    component = fixture.componentInstance;
    component.name = signal('tune') as unknown as typeof component.name;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
