import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('buscaminas-Angular2 app is running!');
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(AppComponent).toBeTruthy();
  });

  describe('Bombs', () => {
    it('should place the bombs randomly in the given array', () => {
      const inputArray = new Array(25);
      const fixture = TestBed.createComponent(AppComponent);
      
      const numBombs = 5;
      const resultArray = component.Bombs(inputArray, numBombs);
      expect(resultArray.filter((cell: number) => cell === -1).length).toBe(numBombs);
    });
  });

  it(`should have as title 'buscaminas-Angular2'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.puntos).toEqual('0');
  });
});
