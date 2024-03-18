import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Utils } from 'src/app/helpers/utils';
import { Group } from 'src/app/model/products/all';
import { GroupService } from 'src/app/services/products/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, OnDestroy {
  
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  groupService = inject(GroupService)
  groups: Group[]= [];
  destroy$ = new Subject<void>();
  dept: string;

  ngOnInit(): void {
    this.dept = this.activatedRoute.snapshot.paramMap.get('dept');
    if ( Utils.isValid(this.dept)){
      let observable = this.groupService.getAllGroups(this.dept);
      observable.subscribe(a=>{
        this.groups = a;
      });
    }
    
  }
  
  ngOnDestroy(): void {
    console.log('Destrying component...')
    this.destroy$.next();
    this.destroy$.complete();
  }
}
