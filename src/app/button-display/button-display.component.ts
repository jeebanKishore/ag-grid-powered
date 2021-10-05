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
  isButtonvisible: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
    console.log(params)
    this.data = params;
    this.isButtonvisible = this.data.node.hasChildren();
  }

  refresh(params) {
    return false;
  }

  toggleTreState() {
    this.data.node.setExpanded(!this.data.node.expanded);
  }

}
