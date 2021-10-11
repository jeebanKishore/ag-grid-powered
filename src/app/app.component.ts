import { Component, ElementRef, ViewChild } from '@angular/core';
import { ColDef, GridApi, RowNode } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { ButtonDisplayComponent } from './button-display/button-display.component';
import html2canvas from 'html2canvas';
import pptxgen from "pptxgenjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   *PPT capture code goes here
   *
   * @type {ElementRef}
   * @memberof AppComponent
   */
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  showPreloader = false;

  /**
   *AG grid code goes here
   *
   * @memberof AppComponent
   */
  gridApi;
  gridColumnApi;
  groupMaintainOrder = true;
  rowData: {
    orgHierarchy: string[];
    jobTitle: string;
    employmentType: string;
    salary?: string | number;
    id: number;
    pairedId?: number;
  }[];
  columnDefs: ColDef[];
  defaultColDef;
  pinnedBottomRowData: any[];
  isFullWidthCell: any;
  fullWidthCellRenderer: any;
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
      } else return '$30,000.00';
    } catch (error) {
      return '$30,000.00';
    }
  }

  buttonDisplay(params) {
    console.log(params)
    let cssClass;
    let message;
    cssClass = 'example-full-width-row';
    message = 'Normal full width row at index' + params.rowIndex;

    const eDiv = document.createElement('div');
    eDiv.innerHTML =
      '<div class="' +
      cssClass +
      '"><button>Click</button> ' +
      message +
      '</div>';
    const eButton = eDiv.querySelector('button');
    eButton.addEventListener('click', function () {
      alert('button clicked');
    });
    return eDiv;
  }
  constructor() {
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
      { field: 'jobTitle', sortable: true, comparator: this.keepPairedID },
      { field: 'employmentType', sortable: true, comparator: this.keepPairedID },
      { field: 'salary', sortable: true, valueFormatter: this.valueForamtter, comparator: this.keepPairedID },
      { field: 'action', cellRenderer: 'buttonDisplayComponent' },
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
    this.isFullWidthCell = function (rowNode) {
      return rowNode.rowPinned;
    };
    this.fullWidthCellRenderer = function (params) {
      let string = '';

      const eDiv = document.createElement('div');

      for (const [key, value] of Object.entries(params.data)) {
        string += ` (${value})${key},`;
      }
      eDiv.innerText = string.slice(0, -1);
      return eDiv;
    };
  }

  keepPairedID = (valueA, valueB, nodeA: RowNode, nodeB: RowNode, isInverted) => {
    console.log(valueA, valueB, nodeA, nodeB, isInverted);
    if (nodeA.data?.pairedId == nodeB.data?.pairedId) return 0;
    return (nodeA.data?.pairedId > nodeB.data?.pairedId) ? 1 : -1;
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.pinnedBottomRowData = this.getRowData();
  }

  frameworkComponents = {
    buttonDisplayComponent: ButtonDisplayComponent
  }

  getRowData() {
    let rowData = [];
    this.rowData.forEach((element) => {
      rowData.push(element.jobTitle);
    });
    let counts = rowData.reduce(function (obj, b) {
      obj[b] = ++obj[b] || 1;
      return obj;
    }, {});
    return [counts];
  }
  /**
   * Download logic starts from here
   * Use Html2canvas to get high quality snapshot of the canvas
   * 
   * Use pptxgenjs to create PPT and add the image into that
   * Make that ppt download
   */
  downloadAsImage() {
    this.showPreloader = true;
      this.gridApi.setSideBarVisible(false);
  
    html2canvas(this.screen.nativeElement, {
      scale: 5,
      logging: false,
      removeContainer: true,
      useCORS: true,
      allowTaint: false
    }).then(canvas => {
      //this.canvas.nativeElement.src = canvas.toDataURL();
      // this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      // this.downloadLink.nativeElement.download = 'marble-diagram.png';
      // this.downloadLink.nativeElement.click();
      let pres = new pptxgen();
      let slide = pres.addSlide();
      slide.addImage({ path: canvas.toDataURL('image/png'), x: '1%', y: '1%', w: '95%', h: '95%' });
      pres.writeFile({ fileName: "Sample Presentation.pptx" });
      this.gridApi.setSideBarVisible(true);
      this.showPreloader = false;
    });
  }
}
