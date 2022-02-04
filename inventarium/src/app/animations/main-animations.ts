// import the required animation functions from the angular animations module
import { trigger, transition, style, query, group, animateChild, animate, keyframes, state } from '@angular/animations';


export const fader =
    trigger('routeAnimations', [
        transition('* <=> *', [
            // Set a default  style for enter and leave
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    width: '80%',
                    opacity: 0,
                    transform: 'scale(0) translateY(80%)',
                }),
            ]),
            // Animate the new page in
            query(':enter', [
                animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
            ])
        ]),
    ]);