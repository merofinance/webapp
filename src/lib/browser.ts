export function openAndFocusWindow(address: string, target?: string) {
  const newWindow = window.open(address, target);
  if (newWindow) {
    newWindow.focus();
  }
}
