import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  gridApi;
  gridColumnApi;

  rowData;
  columnDefs: ColDef[];
  defaultColDef;
  pinnedBottomRowData: any[];
  autoGroupColumnDef;
  groupDefaultExpanded;
  getDataPath;
  sideBar: {
    toolPanels: {
      id: string;
      labelDefault: string;
      labelKey: string;
      iconKey: string;
      toolPanel: string;
      minWidth: number;
      maxWidth: number;
      width: number;
    }[];
    position: string;
    defaultToolPanel: string;
  };

  valueForamtter(params: { value: any }) {
    try {
      let floatAmount = parseFloat(params.value);
      if (floatAmount > 0) {
        var formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        return formatter.format(floatAmount);
      } else return '$30,000';
    } catch (error) {
      return '$30,000';
    }
  }
  constructor() {
    this.pinnedBottomRowData = this.createData(1, 'Bottom');
    this.rowData = [
      {
        orgHierarchy: ['Erica Rogers'],
        jobTitle: 'CEO',
        employmentType: 'Permanent',
        salary: '1500000',
        id: 1,
      },
      {
        orgHierarchy: ['Erica Rogers', 'Erica Rogers Asst'],
        jobTitle: 'CEO Asst',
        employmentType: 'Permanent',
        salary: '100000',
        id: 1001,
        pairedId: 1,
      },
      {
        orgHierarchy: ['Erica Rogers', 'Erica Rogers Asst Jr'],
        jobTitle: 'CEO Asst',
        employmentType: 'Permanent',
        salary: '60000',
        id: 1002,
        pairedId: 1,
      },
      {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett'],
        jobTitle: 'Exec. Vice President',
        employmentType: 'Permanent',
        id: 2,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Asst Malcolm Barrett',
        ],
        jobTitle: 'Asst Director of Operations',
        employmentType: 'Permanent',
        salary: 85000,
        id: 2001,
        pairedId: 2,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Asst Jr Malcolm Barrett',
        ],
        jobTitle: 'Asst Jr Director of Operations',
        employmentType: 'Permanent',
        salary: 55000,
        id: 2002,
        pairedId: 2,
      },
      {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker'],
        jobTitle: 'Director of Operations',
        employmentType: 'Permanent',
        id: 3,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Esther Baker',
          'Brittany Hanson',
        ],
        jobTitle: 'Fleet Coordinator',
        employmentType: 'Permanent',
        id: 4,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Esther Baker',
          'Brittany Hanson',
          'Leah Flowers',
        ],
        jobTitle: 'Parts Technician',
        employmentType: 'Contract',
        id: 5,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Esther Baker',
          'Brittany Hanson',
          'Leah Flowers',
          'Leah Flowers Asst',
        ],
        jobTitle: 'Parts Technician',
        employmentType: 'Contract',
        salary: 20000,
        id: 5001,
        pairedId: 5,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Esther Baker',
          'Brittany Hanson',
          'Tammy Sutton',
        ],
        jobTitle: 'Service Technician',
        employmentType: 'Contract',
        id: 6,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Esther Baker',
          'Derek Paul',
        ],
        jobTitle: 'Inventory Control',
        employmentType: 'Permanent',
        id: 7,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Esther Baker',
          'Derek Asst Paul',
        ],
        jobTitle: 'Inventory Control',
        employmentType: 'Permanent',
        id: 7001,
        pairedId: 7,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Esther Baker',
          'Derek Asst Paul Jr',
        ],
        jobTitle: 'Inventory Control',
        employmentType: 'Permanent',
        id: 7002,
        pairedId: 7,
      },
      {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland'],
        jobTitle: 'VP Sales',
        employmentType: 'Permanent',
        id: 8,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Francis Strickland',
          'Morris Hanson',
        ],
        jobTitle: 'Sales Manager',
        employmentType: 'Permanent',
        id: 9,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Francis Strickland',
          'Todd Tyler',
        ],
        jobTitle: 'Sales Executive',
        employmentType: 'Contract',
        id: 10,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Francis Strickland',
          'Todd Tyler Asst',
        ],
        jobTitle: 'Sales Executive',
        employmentType: 'Contract',
        salary: 60000,
        id: 10001,
        pairedId: 10,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Francis Strickland',
          'Todd Tyler Asst Jr',
        ],
        jobTitle: 'Sales Executive',
        employmentType: 'Contract',
        salary: 480000,
        id: 10002,
        pairedId: 10,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Francis Strickland',
          'Bennie Wise',
        ],
        jobTitle: 'Sales Executive',
        employmentType: 'Contract',
        id: 11,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Francis Strickland',
          'Joel Cooper',
        ],
        jobTitle: 'Sales Executive',
        employmentType: 'Permanent',
        id: 12,
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Francis Strickland',
          'Joel Cooper Asst Jr',
        ],
        jobTitle: 'Sales Executive',
        employmentType: 'Permanent',
        id: 12002,
        pairedId: 12,
        salary: 15000,
      },
    ];
    this.columnDefs = [
      { field: 'jobTitle', sortable: true },
      { field: 'employmentType', sortable: true },
      { field: 'salary', sortable: true, valueFormatter: this.valueForamtter },
    ];
    this.defaultColDef = { flex: 1 };

    this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          minWidth: 225,
          maxWidth: 225,
          width: 225,
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
          minWidth: 180,
          maxWidth: 400,
          width: 250,
        },
      ],
      position: 'right',
      defaultToolPanel: 'filters',
    };

    this.autoGroupColumnDef = {
      headerName: 'Organisation Hierarchy',
      minWidth: 300,
      cellRendererParams: { suppressCount: true },
    };
    this.groupDefaultExpanded = -1;
    this.getDataPath = function (data) {
      return data.orgHierarchy;
    };
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  createData(count, prefix) {
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push({
        athlete: prefix + ' Athlete ' + i,
        age: prefix + ' Age ' + i,
        country: prefix + ' Country ' + i,
        year: prefix + ' Year ' + i,
        date: prefix + ' Date ' + i,
        sport: prefix + ' Sport ' + i,
      });
    }
    return result;
  }
}
