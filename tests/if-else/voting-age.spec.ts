import { test, expect } from '@playwright/test';

function getVotingMessage(age: number): string {
  if (age >= 18) {
    return 'Ви можете голосувати.';
  } else {
    return 'Ви ще не можете голосувати.';
  }
}

test('age 17 - user cannot vote', () => {
  expect(getVotingMessage(17)).toBe('Ви ще не можете голосувати.');
});

test('age 18 - user can vote', () => {
  expect(getVotingMessage(18)).toBe('Ви можете голосувати.');
});

test('age 19 - user can vote', () => {
  expect(getVotingMessage(19)).toBe('Ви можете голосувати.');
});

test('age 10 - user cannot vote', () => {
  expect(getVotingMessage(10)).toBe('Ви ще не можете голосувати.');
});

test('age 30 - user can vote', () => {
  expect(getVotingMessage(30)).toBe('Ви можете голосувати.');
});
