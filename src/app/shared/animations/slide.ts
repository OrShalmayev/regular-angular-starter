import {
  animate,
  AnimationTransitionMetadata,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

export type SlideAnimationAxis = 'X' | 'Y';
export interface SlideAnimationOptions {
  axis: SlideAnimationAxis;
  opacity: boolean;
  ms: number;
}

const SLIDE_ANIMATIONS_DEFAULT_OPTIONS: SlideAnimationOptions = {
  axis: 'Y',
  ms: 200,
  opacity: true,
};

function mergeOptions(options?: Partial<SlideAnimationOptions>): SlideAnimationOptions {
  return { ...SLIDE_ANIMATIONS_DEFAULT_OPTIONS, ...options };
}

export class SlideAnimations {
  static inTransition(options?: Partial<SlideAnimationOptions>): AnimationTransitionMetadata {
    const { axis, ms, opacity } = mergeOptions(options);
    const tokens: Record<string, string | number> = { transform: `translate${axis}(-100%)` };
    const tokensAnimation: Record<string, string | number> = { transform: 'translate(0%)' };
    if (opacity) {
      tokens.opacity = 0;
      tokensAnimation.opacity = 1;
    }
    return transition(':enter', [style(tokens), animate(ms, style(tokensAnimation))]);
  }
  static outTransition(options?: Partial<SlideAnimationOptions>): AnimationTransitionMetadata {
    const { axis, ms, opacity } = mergeOptions(options);
    const tokens: Record<string, string | number> = { transform: `translate${axis}(-100%)` };
    if (opacity) {
      tokens.opacity = 0;
    }
    return transition(':leave', [animate(ms, style(tokens))]);
  }
  static inOut(options?: Partial<SlideAnimationOptions>): AnimationTriggerMetadata {
    return trigger('slideInOut', [SlideAnimations.inTransition(options), SlideAnimations.outTransition(options)]);
  }
  static in(options?: Partial<SlideAnimationOptions>): AnimationTriggerMetadata {
    return trigger('slideIn', [SlideAnimations.inTransition(options)]);
  }
  static out(options?: Partial<SlideAnimationOptions>): AnimationTriggerMetadata {
    return trigger('slideOut', [SlideAnimations.outTransition(options)]);
  }
}
