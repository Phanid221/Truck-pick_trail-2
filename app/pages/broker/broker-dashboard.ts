import { EventData, Page } from '@nativescript/core';
import { BrokerDashboardViewModel } from './broker-dashboard-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new BrokerDashboardViewModel();
}