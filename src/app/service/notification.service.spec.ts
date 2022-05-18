import { TestBed } from '@angular/core/testing';
import { NotifierModule } from 'angular-notifier';
import { NotificationService } from './notification.service';


describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NotifierModule
      ]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
