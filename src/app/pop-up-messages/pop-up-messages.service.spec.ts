import { TestBed } from '@angular/core/testing';

import { PopUpMessagesService } from './pop-up-messages.service';

describe('PopUpMessagesService', () => {
  let service: PopUpMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
