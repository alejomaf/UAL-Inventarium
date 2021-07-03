import { TestBed } from '@angular/core/testing';

import { BookshelfsService } from './bookshelfs.service';

describe('BookshelfsService', () => {
  let service: BookshelfsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookshelfsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
