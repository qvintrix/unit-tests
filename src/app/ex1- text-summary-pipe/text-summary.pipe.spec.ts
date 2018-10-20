import {TextSummaryPipe} from './text-summary.pipe';

describe('TextSummaryPipe', () => {
  let pipe: TextSummaryPipe;

  beforeEach(() => {
    pipe = new TextSummaryPipe();
  });

  it('should return an empty string if input is null', () => {
    const value = null;

    const res = pipe.transform(value);

    expect(res).toBeFalsy();
  });

  it('should return empty string if input is undefined', () => {
    const value = undefined;

    const res = pipe.transform(value);

    expect(res).toBeFalsy();
  });

  it('should return empty string if input is an empty string', () => {
    const value = '';

    const res = pipe.transform(value);

    expect(res).toBe(value);
  });

  it('should return the same string if the length of input is less than the limit', () => {
    const value = 'test';
    const limit = 10;

    const res = pipe.transform(value, limit);

    expect(res).toBe(value);
  });

  it('should summarize the input if it is longer than the limit', () => {
    const value = 'test';
    const limit = 3;
    const ellipsis = '...';

    const res = pipe.transform(value, limit);

    expect(res).toContain(ellipsis);
  });

  it('should assume 10 as the limit if not given', () => {
    const value = 'loremloremloremloremlorem';
    const defaultLimitLength = 13;

    const res = pipe.transform(value);

    expect(res.length).toBe(defaultLimitLength);
  });
});
