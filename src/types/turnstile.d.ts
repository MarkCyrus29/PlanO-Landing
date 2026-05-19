/* eslint-disable @typescript-eslint/no-explicit-any */
interface TurnstileInstance {
  render: (element: HTMLElement, options: Record<string, any>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

interface Window {
  turnstile?: TurnstileInstance;
}
