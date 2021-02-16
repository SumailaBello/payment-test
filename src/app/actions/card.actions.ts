// Section 1
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Card } from '../models/card.model';

// Section 2
export const ADD_CARD       = '[CARD] Add';
export const REMOVE_CARD   = '[CARD] Remove';
export const RESET_CARD   = '[CARD] Reset';

// Section 3
export class AddCard implements Action {
    readonly type = ADD_CARD

    constructor(public payload: Card) {}
}

export class RemoveCard implements Action {
    readonly type = REMOVE_CARD

    constructor(public payload: number) {}
}

export class ResetCard implements Action {
    readonly type = RESET_CARD

    // constructor(public payload: number) {}
}

// Section 4
export type Actions = AddCard | RemoveCard | ResetCard