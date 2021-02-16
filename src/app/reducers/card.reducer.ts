import { Action } from '@ngrx/store'
import { Card } from '../models/card.model';
import * as CardActions from './../actions/card.actions';

// Section 1
const initialState: Card = {
    cardNumber: '0000000000000000',
    cardHolder: 'John Doe',
    expirationDate: new Date(),
    CCV: '',
    amount: 0,
}

// Section 2
export function reducer(state: Card[] = [initialState], action: CardActions.Actions) {

    // Section 3
    switch(action.type) {
        case CardActions.ADD_CARD:
            // return [...state, action.payload];   to keep adding to the state array
            return [action.payload]; //this one ensures only one card in state array
        case CardActions.RESET_CARD:
            // return [...state, action.payload];   to keep adding to the state array
            return [initialState]; //this one ensures only one card in state array
        default:
            return state;
    }
}