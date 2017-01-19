import React from 'react';
import DateFormattingService from './DateFormattingService';

it('formats dates in long format', () => {
  const date = new Date(Date.UTC(2012, 11, 20, 12, 0, 0));
  const formattedDate = DateFormattingService.formatDate(date);

  expect (formattedDate).toBe('Thursday, December 20, 2012');
});
