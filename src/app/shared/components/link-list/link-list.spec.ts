import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { signal } from '@angular/core';

import { LinkListComponent } from './link-list';

describe('LinkListComponent', () => {
  let component: LinkListComponent;
  let fixture: ComponentFixture<LinkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkListComponent);
    component = fixture.componentInstance;

    component.label = signal('View') as unknown as typeof component.label;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
