// import the required animation functions from the angular animations module
import { trigger, transition, style, query, group, animateChild, animate, keyframes, state } from '@angular/animations';


export const slider =
    trigger('routeAnimations', [
        transition('* => isLeft', slideTo('left')),
        transition('* => isRight', slideTo('right')),
        transition('isRight => *', slideTo('left')),
        transition('isLeft => *', slideTo('right'))
    ]);

function slideTo(direction: any) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                [direction]: 0,
                width: '40%'
            })
        ], optional),
        query(':enter', [
            style({ [direction]: '-100%' })
        ]),
        group([
            query(':leave', [
                animate('800ms ease', style({ [direction]: '100%' }))
            ], optional),
            query(':enter', [
                animate('800ms ease', style({ [direction]: '30%' }))
            ])
        ]),
        // Normalize the page style... Might not be necessary

        // Required only if you have child animations on the page
        // query(':leave', animateChild()),
        // query(':enter', animateChild()),
    ];
}

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