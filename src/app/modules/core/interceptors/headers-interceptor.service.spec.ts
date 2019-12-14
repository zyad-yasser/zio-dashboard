import { TestBed, inject } from '@angular/core/testing';
import { HeadersInterceptorService } from './headers-interceptor.service';

describe('Service: HeadersInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeadersInterceptorService]
    });
  });

  it('should ...', inject([HeadersInterceptorService], (service: HeadersInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
