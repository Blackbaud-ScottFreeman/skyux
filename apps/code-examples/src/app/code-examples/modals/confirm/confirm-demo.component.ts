import { Component } from '@angular/core';
import {
  SkyConfirmButtonConfig,
  SkyConfirmInstance,
  SkyConfirmService,
  SkyConfirmType,
  skyCreateConfirmButtonConfigs,
} from '@skyux/modals';

@Component({
  selector: 'app-confirm-demo',
  templateUrl: './confirm-demo.component.html',
})
export class ConfirmDemoComponent {
  public selectedAction: string | undefined;

  public selectedText: string | undefined;

  #confirmSvc: SkyConfirmService;

  constructor(confirmSvc: SkyConfirmService) {
    this.#confirmSvc = confirmSvc;
  }

  public openOKConfirm(): void {
    // Type is inferred as SkyConfirmInstance<'ok'> because of the use of SkyConfirmType.OK.
    // Using SkyConfirmInstance is allowed here, but you would lose the strongly typed action.
    const dialog = this.#confirmSvc.open({
      message:
        'Cannot delete invoice because it has vendor, credit memo, or purchase order activity.',
      type: SkyConfirmType.OK,
    });

    dialog.closed.subscribe((result) => {
      this.selectedText = undefined;

      // Despite having a SkyConfirmInstance<'ok'>, the close event args
      // has a type of SkyConfirmCloseEventArgs<'ok' | 'cancel'>.
      // This is because the user might close the modal using
      // either the Escape key or close button in the upper right.
      this.selectedAction = result.action;
    });
  }

  public openTwoActionConfirm(): void {
    // You can explicity state the actions you want.
    const buttons: SkyConfirmButtonConfig<'save' | 'cancel'>[] = [
      { text: 'Finalize', action: 'save', styleType: 'primary' },
      { text: 'Cancel', action: 'cancel', styleType: 'link' },
    ];

    // Type is inferred as SkyConfirmInstance<'save' | 'cancel'>
    // because of the type of buttons. Using SkyConfirmInstance
    // is allowed here, but you would lose the strongly typed action.
    const dialog = this.#confirmSvc.open({
      message: 'Finalize report cards?',
      body: 'Grades cannot be changed once the report cards are finalized.',
      type: SkyConfirmType.Custom,
      buttons,
    });

    dialog.closed.subscribe((result) => {
      this.selectedAction = result.action;
      this.selectedText = buttons.find((b) => b.action === result.action)?.text;
    });
  }

  public openThreeActionConfirm(): void {
    // Generic types aren't required. They fallback to string by default.
    const buttons: SkyConfirmButtonConfig[] = [
      { text: 'Save', action: 'save', styleType: 'primary' },
      { text: 'Delete', action: 'delete' },
      { text: 'Keep working', action: 'cancel', styleType: 'link' },
    ];

    const dialog: SkyConfirmInstance = this.#confirmSvc.open({
      message: 'Save your changes before leaving?',
      type: SkyConfirmType.Custom,
      buttons,
    });

    dialog.closed.subscribe((result) => {
      this.selectedAction = result.action;
      this.selectedText = buttons.find((b) => b.action === result.action)?.text;
    });
  }

  public openDeleteConfirm(): void {
    // Using inferred types works best when possible.
    // This passthrough function provides code completion
    // from your IDE and strongly typed button configs.
    // You can also inline the button config when calling
    // SkyConfirmService.open to achieve the same inferred types.
    const buttons = skyCreateConfirmButtonConfigs([
      { text: 'Delete', action: 'delete', styleType: 'danger' },
      { text: 'Cancel', action: 'cancel', styleType: 'link' },
    ]);

    const dialog = this.#confirmSvc.open({
      message: 'Delete this account?',
      body: 'Deleting this account may affect processes that are currently running.',
      type: SkyConfirmType.Custom,
      buttons,
    });

    dialog.closed.subscribe((result) => {
      this.selectedAction = result.action;
      this.selectedText = buttons.find((b) => b.action === result.action)?.text;
    });
  }
}
