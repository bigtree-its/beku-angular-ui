import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBasketShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Utils } from 'src/app/helpers/utils';
import { Group, Product } from 'src/app/model/products/all';
import { GroupService } from 'src/app/services/products/group.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  
  activatedRoute = inject(ActivatedRoute);
  groupService = inject(GroupService);
  products: Product[]= [];
  error: boolean;
  errorMessage: string;
  destroy$ = new Subject<void>();
  faCart = faBasketShopping;
  faHeart = faHeart;
  group: string;
  dept: string;
  grp: string;
  grpId: string;

  ngOnInit(): void {
    this.dept = this.activatedRoute.snapshot.queryParamMap.get('dept');
    this.grp = this.activatedRoute.snapshot.queryParamMap.get('grp');
    this.grpId = this.activatedRoute.snapshot.queryParamMap.get('grpid');
    if (! Utils.isValid(this.grpId)){
      this.error = true;
      this.errorMessage =
        'Group not found. Please contact customer support';
    }else{
      console.log('Fetching products for group '+ this.group)
      let observable = this.groupService.getProducts(this.grpId);
      observable.subscribe(p=>{
        this.products = p;
      });
    }
   
  }
  ngOnDestroy(): void {
    console.log('Destroying component...')
    this.destroy$.next();
    this.destroy$.complete();
  }
}
