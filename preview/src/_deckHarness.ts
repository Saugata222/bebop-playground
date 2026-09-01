export type DeckRect = [number, number, number, number];
export type DeckSize = [number, number];

export type LiveDeckState = {
  label: string;
  chrome: string;
  view?: string;
  transitionGroup?: string;
  rect: DeckRect;
  base: DeckSize;
  shadow?: boolean;
  screenRadius?: number;
  labels?: string[];
  labelWidths?: number[];
  labelText?: string;
  labelWidth?: number;
  labelAltText?: string;
  labelAltWidth?: number;
  headerSrc?: string;
  heading?: string;
};

export type LiveDeckSlide = Omit<LiveDeckState, 'view'> & {
  type: 'live';
  iframe: string;
};

/** Converts experiment view states into live deck slides with consistent URLs. */
export function liveDeckSlides(experiment: string, states: readonly LiveDeckState[]): LiveDeckSlide[] {
  return states.map(({ view, ...state }) => ({
    ...state,
    type: 'live',
    iframe: experiment + (view ? '?view=' + encodeURIComponent(view) : ''),
  }));
}