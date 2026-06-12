// src/types/model-viewer.d.ts
declare namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        poster?: string;
        shadowIntensity?: string;
        'shadow-intensity'?: string;
        'camera-controls'?: boolean;
        'touch-action'?: string;
        'auto-rotate'?: boolean;
        'rotation-per-second'?: string;
        exposure?: string;
        'ar'?: boolean;
        'ar-modes'?: string;
        'ar-scale'?: string;
        'ios-src'?: string;
        'interaction-prompt'?: string;
        'environment-image'?: string;
        'skybox-image'?: string;
        'poster-color'?: string;
        style?: React.CSSProperties;
        slot?: string;
      };
    }
  }
  