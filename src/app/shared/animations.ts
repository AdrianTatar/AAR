import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';

export const fadeInOut = trigger('animRoutes', [
  transition('one => two', [
    group([
      query(
        ':enter',
        [
          style({
            opacity: 0,
            transform: 'translateY(9rem) rotate(-10deg)'
          }),
          animate(
            '0.35s cubic-bezier(0, 1.8, 1, 1.8)',
            style({ opacity: 1, transform: 'translateY(0) rotate(0)' })
          ),
          animateChild()
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [animate('0.35s', style({ opacity: 0 })), animateChild()],
        { optional: true }
      )
    ])
  ])
]);
