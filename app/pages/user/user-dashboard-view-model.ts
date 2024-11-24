import { Observable } from '@nativescript/core';

export class UserDashboardViewModel extends Observable {
    private _shipments: any[] = [];

    constructor() {
        super();
        this.loadMockData();
    }

    loadMockData() {
        this._shipments = [
            { 
                id: 'SH001', 
                pickup: 'New York, NY', 
                delivery: 'Boston, MA', 
                status: 'Pending',
                price: '$850'
            },
            { 
                id: 'SH002', 
                pickup: 'Los Angeles, CA', 
                delivery: 'San Francisco, CA', 
                status: 'In Transit',
                price: '$1,200'
            }
        ];
        this.notifyPropertyChange('shipments', this._shipments);
    }

    get shipments(): any[] {
        return this._shipments;
    }

    onBookShipment() {
        console.log('Booking new shipment');
    }

    onTrackShipment() {
        console.log('Opening tracking page');
    }

    onViewShipment(args) {
        console.log('Viewing shipment:', args.object.bindingContext.id);
    }

    onLogout() {
        const frame = require('@nativescript/core').Frame;
        frame.topmost().navigate({
            moduleName: 'pages/auth/login-page',
            clearHistory: true
        });
    }
}