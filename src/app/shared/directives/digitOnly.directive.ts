import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[digit-only]'
})
export class DigitOnly {
    constructor(el: ElementRef) { }

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        let e = <KeyboardEvent>event;
        const keyCode = Number(e.key);
        if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A
            (keyCode == 65 && e.ctrlKey === true) ||
            // Allow: Ctrl+C
            (keyCode == 67 && e.ctrlKey === true) ||
            // Allow: Ctrl+X
            (keyCode == 88 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (keyCode >= 35 && keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || !(keyCode < 48 || keyCode > 57)) && !(keyCode < 96 || keyCode > 105)) {
            e.preventDefault();
        }
    }
}