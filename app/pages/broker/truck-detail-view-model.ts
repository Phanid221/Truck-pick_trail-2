import { Observable } from '@nativescript/core';

export class TruckDetailViewModel extends Observable {
    private _truck: any;
    private _driver: any;
    private _currentCargo: any;
    private _metrics: any;

    constructor(truckId: string) {
        super();
        this.loadTruckData(truckId);
    }

    private loadTruckData(truckId: string) {
        // Mock data - replace with actual data fetching
        this._truck = {
            id: truckId,
            plateNumber: 'XYZ-123',
            type: 'Heavy Duty Truck',
            status: 'On Route',
            capacity: '20 tons'
        };

        this._driver = {
            name: 'John Smith',
            phone: '+1 (555) 123-4567',
            experience: '5 years experience',
            rating: '⭐⭐⭐⭐½ (4.5)'
        };

        this._currentCargo = {
            type: 'Electronics',
            weight: '15 tons',
            destination: 'San Francisco, CA'
        };

        this._metrics = {
            deliveriesThisMonth: 28,
            onTimeRate: 95,
            totalDistance: '4,521 miles'
        };

        this.notifyPropertyChange('truck', this._truck);
        this.notifyPropertyChange('driver', this._driver);
        this.notifyPropertyChange('currentCargo', this._currentCargo);
        this.notifyPropertyChange('metrics', this._metrics);
    }

    get truck(): any { return this._truck; }
    get driver(): any { return this._driver; }
    get currentCargo(): any { return this._currentCargo; }
    get metrics(): any { return this._metrics; }
}