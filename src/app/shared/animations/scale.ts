import {
  animate,
  AnimationTransitionMetadata,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

export class ScaleAnimations {
  static outTransition(ms = 100): AnimationTransitionMetadata {
    return transition(':leave', [animate(ms, style({ transform: 'scale(0)' }))]);
  }
  static inTransition(ms = 100, from = 0, to = 1): AnimationTransitionMetadata {
    return transition(':enter', [
      style({ transform: `scale(${from})` }),
      animate(ms, style({ transform: `scale(${to})` })),
    ]);
  }
  static inOut(ms = 100): AnimationTriggerMetadata {
    return trigger('scaleInOut', [ScaleAnimations.inTransition(ms), ScaleAnimations.outTransition(ms)]);
  }
  static in(ms = 100, from = 0, to = 1): AnimationTriggerMetadata {
    return trigger('scaleIn', [ScaleAnimations.inTransition(ms, from, to)]);
  }
  static out(ms = 100): AnimationTriggerMetadata {
    return trigger('scaleOut', [ScaleAnimations.outTransition(ms)]);
  }
}
