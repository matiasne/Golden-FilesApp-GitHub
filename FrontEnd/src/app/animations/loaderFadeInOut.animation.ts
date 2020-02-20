import { trigger, state, animate, transition, style } from '@angular/animations';
 
export const LoaderFadeInOutAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('loaderFadeInOutAnimation', [
        transition(':enter', [
          style({
                  opacity: 0
          }),
          animate(350)
        ]),
        transition('* => void', [
            style({
                  opacity: 0
              }), 
            animate(350)
        ])
      ]);