import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Group } from 'src/app/model/products/all';
import { GroupService } from 'src/app/services/products/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {
  
  groupService = inject(GroupService)
  groups: Group[]= [];

  ngOnInit(): void {
    let observable = this.groupService.getAll();
    observable.subscribe(a=>{
      this.groups = a;
    });
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
