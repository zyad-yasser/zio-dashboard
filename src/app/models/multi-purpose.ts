class Slide {
  centerCaption?: string | null;
  minorCaptions?: {
    main: string;
    secondary: string;
  };
  background: string;
  path: string;
}

class Button {
  text: string;
  path: string;
}

export class MultiPurpose {
  id?: string;
  slides: Slide [] = [];
  withTabs: boolean;
  withCenterCaption: boolean;
  withController: boolean;
  withMinorCaptions: boolean;
  direction: 'left' | 'right';
  type: 'static' | 'slider';
  button?: Button;
  title?: string;
}
