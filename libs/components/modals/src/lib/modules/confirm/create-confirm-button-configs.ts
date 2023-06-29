import { SkyConfirmButtonConfig } from './confirm-button-config';

export function skyCreateConfirmButtonConfigs<TAction extends string>(
  buttons: SkyConfirmButtonConfig<TAction>[]
): SkyConfirmButtonConfig<TAction>[] {
  return buttons;
}
