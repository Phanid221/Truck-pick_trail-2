import { Observable } from '@nativescript/core';

export class BrokerDashboardViewModel extends Observable {
    private _selectedTabIndex: number = 0;
    private _shipments: any[] = [];
    private _trucks: any[] = [];
    private _activeTrucks: number = 5;
    private _pendingShipments: number = 8;
    private _completedToday: number = 12;
    private _todayRevenue: string = '$2,450';
    private _monthRevenue: string = '$45,280';
    private _completionRate: number = 94;
    private _onTimeRate: number = 88;

    constructor() {
        super();
        this.loadMockData();
    }

    loadMockData() {
        // Mock shipments data
        this._shipments = [
            { id: 'SH001', pickup: 'New York, NY', delivery: 'Boston, MA', status: 'Pending' },
            { id: 'SH002', pickup: 'Los Angeles, CA', delivery: 'San Francisco, CA', status: 'In Transit' },
            { id: 'SH003', pickup: 'Chicago, IL', delivery: 'Detroit, MI', status: 'Completed' }
        ];

        // Mock trucks data
        this._trucks = [
            { id: 'T001', plateNumber: 'XYZ-123', type: 'Heavy Duty', status: 'Available' },
            { id: 'T002', plateNumber: 'ABC-456', type: 'Medium Duty', status: 'On Route' },
            { id: 'T003', plateNumber: 'DEF-789', type: 'Light Duty', status: 'Maintenance' }
        ];

        this.notifyPropertyChange('shipments', this._shipments);
        this.notifyPropertyChange('trucks', this._trucks);
    }

    // Getters
    get selectedTabIndex(): number { return this._selectedTabIndex; }
    get shipments(): any[] { return this._shipments; }
    get trucks(): any[] { return this._trucks; }
    get activeTrucks(): number { return this._activeTrucks; }
    get pendingShipments(): number { return this._pendingShipments; }
    get completedToday(): number { return this._completedToday; }
    get todayRevenue(): string { return this._todayRevenue; }
    get monthRevenue(): string { return this._monthRevenue; }
    get completionRate(): number { return this._completionRate; }
    get onTimeRate(): number { return this._onTimeRate; }

    // Actions
    onManageShipment(args) {
        console.log('Managing shipment:', args.object.bindingContext.id);
    }

    onAddTruck() {
        console.log('Adding new truck');
    }

    onTruckTap(args) {
        const truck = args.object.bindingContext;
        const frame = require('@nativescript/core').Frame;
        frame.topmost().navigate({
            moduleName: 'pages/broker/truck-detail',
            context: {
                truckId: truck.id
            },
            transition: {
                name: 'slide'
            }
        });
    }

    onLogout() {
        const frame = require('@nativescript/core').Frame;
        frame.topmost().navigate({
            moduleName: 'pages/auth/login-page',
            clearHistory: true
        });
    }
}