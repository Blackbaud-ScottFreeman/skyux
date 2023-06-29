import { skyCreateConfirmButtonConfigs } from './create-confirm-button-configs';

describe('skyCreateConfirmButtonConfigs', () => {
  // This test only exists for code coverage and to ensure
  // that the types compile. No real functionality is tested.
  it('should create strongly typed button configs', () => {
    const buttons = skyCreateConfirmButtonConfigs([
      { text: 'Discard', action: 'discard' },
      { text: 'Keep working', action: 'keep' },
    ]);

    for (const button of buttons) {
      switch (button.action) {
        case 'discard':
          expect(button.action).toEqual('discard');
          break;

        case 'keep':
          expect(button.action).toEqual('keep');
          break;
      }
    }
  });
});
