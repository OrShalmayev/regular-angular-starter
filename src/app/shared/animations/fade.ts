import {
  animate,
  AnimationTransitionMetadata,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

export class FadeAnimations {
  static inTransition(ms = 200): AnimationTransitionMetadata {
    return transition(':enter', [style({ opacity: 0 }), animate(ms, style({ opacity: 1 }))]);
  }
  static outTransition(ms = 200): AnimationTransitionMetadata {
    return transition(':leave', [animate(ms, style({ opacity: 0 }))]);
  }
  static inOut(ms = 200): AnimationTriggerMetadata {
    return trigger('fadeInOut', [FadeAnimations.inTransition(ms), FadeAnimations.outTransition(ms)]);
  }
  static in(ms = 200): AnimationTriggerMetadata {
    return trigger('fadeIn', [FadeAnimations.inTransition(ms)]);
  }
  static out(ms = 200): AnimationTriggerMetadata {
    return trigger('fadeOut', [FadeAnimations.outTransition(ms)]);
  }
}
