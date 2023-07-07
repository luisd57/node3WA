import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialChartComponent } from './material-chart.component';

describe('MaterialChartComponent', () => {
  let component: MaterialChartComponent;
  let fixture: ComponentFixture<MaterialChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialChartComponent]
    });
    fixture = TestBed.createComponent(MaterialChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
