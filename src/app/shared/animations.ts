import {
  transition,
  trigger,
  query,
  style,
  animate,
  state,
  keyframes
} from '@angular/animations';

export const fadeAnimation = trigger('animRoutes', [
  transition('* <=> *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),

    query(
      ':leave',
      [style({ opacity: 1 }), animate('0.1s', style({ opacity: 0 }))],
      { optional: true }
    ),

    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);

export const languageChange = trigger('languageChange', [
  transition('* <=> *', animate('0.3s', keyframes([
      style({ opacity: 0 }),
      style({ opacity: 1 })
    ])
  )),
]);
