import { IMaskPipe } from 'angular-imask';
import { PhoneIntlPipe } from './phone-intl.pipe';

describe('PhoneIntlPipe', () => {
  let iMaskPipe: IMaskPipe;
  beforeEach(() => {
    iMaskPipe = new IMaskPipe();
  });
  it('create an instance', () => {
    const pipe = new PhoneIntlPipe(iMaskPipe);
    expect(pipe).toBeTruthy();
  });
});
