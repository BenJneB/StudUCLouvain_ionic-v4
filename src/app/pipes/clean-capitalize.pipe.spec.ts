import { CleanAndCapitalizePipe } from './clean-capitalize.pipe';

describe('CleanCapitalizePipe', () => {
  it('create an instance', () => {
    const pipe = new CleanAndCapitalizePipe();
    expect(pipe).toBeTruthy();
  });
  it('should capitalize first letter', () => {
    const pipe = new CleanAndCapitalizePipe();
    expect(pipe.capitalize('test')).toBe('Test');
  });
  it('should clean and capitalize', () => {
    const pipe = new CleanAndCapitalizePipe();
    expect(pipe.transform('test_with_spaces')).toBe('Test with spaces');
  });
});
