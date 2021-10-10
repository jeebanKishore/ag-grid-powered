import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/all-modules';
@Component({
  selector: 'app-button-display',
  templateUrl: './button-display.component.html',
  styleUrls: ['./button-display.component.scss']
})
export class ButtonDisplayComponent implements AgRendererComponent {
  data: ICellRendererParams;
  isButtonVisible: boolean;
  buttonText:string = 'Expand';
  constructor() { }

  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
    this.data = params;
    this.isButtonVisible = this.data.node.hasChildren();
    (this.data.node.expanded)? this.buttonText = 'Collapse' : this.buttonText = 'Expand';
  }

  refresh(params) {
    console.log(params);
    return true;
  }

  toggleTreState() {
    this.data.node.setExpanded(!this.data.node.expanded);
    (this.data.node.expanded === true)? this.buttonText = 'Collapse' : this.buttonText = 'Expand';
  }

}
