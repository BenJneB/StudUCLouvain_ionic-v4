import { CleanAndCapitalizePipe } from './clean-capitalize.pipe';

describe('CleanCapitalizePipe', () => {
  it('create an instance', () => {
    const pipe = new CleanAndCapitalizePipe();
    expect(pipe).toBeTruthy();
  });
});
