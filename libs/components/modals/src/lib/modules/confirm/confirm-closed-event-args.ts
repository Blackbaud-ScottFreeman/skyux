export interface SkyConfirmCloseEventArgs<TAction extends string = string> {
  /**
   * The identifier for the button that users selected to close the dialog.
   */
  action: TAction | 'cancel';
}
