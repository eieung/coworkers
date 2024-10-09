declare module 'wow.js' {
  export class WOW {
    constructor(options?: {
      boxClass?: string;
      animateClass?: string;
      offset?: number;
      mobile?: boolean;
      live?: boolean;
      callback?: Function;
      scrollContainer?: string;
    });
    init(): void;
  }
}
