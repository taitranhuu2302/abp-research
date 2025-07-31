import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  template: `
    <app-host-dashboard *abpPermission="'Architecture.Dashboard.Host'"></app-host-dashboard>
    <app-tenant-dashboard *abpPermission="'Architecture.Dashboard.Tenant'"></app-tenant-dashboard>
  `,
})
export class DashboardComponent {}
