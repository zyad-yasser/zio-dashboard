import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AgentsService } from 'src/app/services/agents/agents.service';
import { MapperService } from 'src/app/services/mappers/mapper.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { modalConfig } from 'src/app/statics/constants';
import { AgentDataComponent } from '../../modals/agent-data/agent-data.component';
import { agentsColumns } from 'src/app/statics/tables';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.sass']
})
export class AgentsComponent implements OnInit {
  public currentLocation: string[] = ['Home', 'Agents'];
  public pageName = 'Agents';
  public displayedColumns = agentsColumns;
  public pageSizeOptions = [25, 100, 250];
  public tableType = 'agents';
  public maxPageSize = 25;
  public activeSortColumn = 'Agent name';
  public sortDirection = 'asc';
  public agents: any[] = [];

  constructor(
    public dialog: MatDialog,
    private agentsService: AgentsService,
    private mapperService: MapperService,
    private modalService: ModalService,
  ) {}

  public listAgents(): void {
    this.agentsService.list()
      .subscribe((res) => {
        this.agents = this.mapperService.agents(res);
      });
  }

  public createAgent(): void {
    const cb = (res) => {
      if (res) {
        this.agents = [];
        this.listAgents();
      }
    };
    const config = { ...modalConfig, data: { type: 'createAgentModal' } };
    this.modalService.init(this, AgentDataComponent, cb, config);
  }

  ngOnInit() {
    this.listAgents();
  }
}
