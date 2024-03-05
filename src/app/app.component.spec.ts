import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavigationService } from '@UIS-common/layout/shared/services/navigation/navigation.service';

//Para evitar errores en los service workers.
const fn = () => {};
navigator.serviceWorker.register = () => new Promise(fn);

// ================= Para mostrar mas detalles en las pruebas ==================
// console.warn = (message?: any, ...optionalParams: any[]) => {
//   const params = optionalParams ? `\nParams: ${optionalParams}` : '';
//   fail(`Test contained console warning:\n${message}${params}`);
// };

console.error = (message?: any, ...optionalParams: any[]) => {
  const params = optionalParams ? `\nParams: ${optionalParams}` : '';
  fail(`Test contained console error:\n${message}${params}`);
};

// =============================================================================

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule],
        declarations: [AppComponent],
        providers: [NavigationService],
      }).compileComponents();
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
