import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChefSearchQuery } from 'src/app/model/ChefSearchQuery';
import { Cuisine, LocalChef } from 'src/app/model/localchef';
import { ServiceLocation } from 'src/app/model/ServiceLocation';
import { ChefService } from 'src/app/services/chef.service';
import { ContextService } from 'src/app/services/context.service';
import { CuisinesService } from 'src/app/services/cusines.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-cheflist',
  templateUrl: './cheflist.component.html',
  styleUrls: ['./cheflist.component.css']
})
export class CheflistComponent {
  serviceLocation: ServiceLocation;
  localChefs: LocalChef[] = [];
  filteredChefs: LocalChef[] = [];
  serviceLocations: ServiceLocation[] = [];

  starSelected: string = "/assets/icons/star3.png";
  star: string = "/assets/icons/star1.png";
  cuisines: Cuisine[] = [];
  selectedCuisines: Cuisine[] = [];
  selectedCuisine: Cuisine;
  cuisineMap: Map<String, Cuisine> = new Map<String, Cuisine>();

  constructor(private activatedRoute: ActivatedRoute,
    private chefService: ChefService,
    private contextService: ContextService,
    private utils: Utils,
    private cuisinesService: CuisinesService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      var serviceLocation = params['servicelocation'];
      console.log(`Service Location : ${params['servicelocation']}`);
      this.fetchChefsByServiceLocation(serviceLocation);
    });
    this.cuisinesService.getCuisines().subscribe(d => {
      this.cuisines = d;
      this.selectedCuisine = this.cuisines[0];
      for (var i = 0; i < d.length; i++) {
        var theCuisine = d[i];
        this.cuisineMap.set(theCuisine.name, theCuisine);
      }
    });
    this.serviceLocation = this.contextService.getServiceLocation();
  }

  onSelectCuisine(value) {
    var theCuisine = this.cuisineMap.get(value.name);
    this.selectedCuisines = [];
    this.filteredChefs = [];
    this.selectedCuisines.push(theCuisine);
    this.filterByCuisine();
  }

  selectCuisine(extraClicked: string, e: any) {
    this.filteredChefs = [];
    if (e.target.checked) {
      var theCuisine = this.cuisineMap.get(extraClicked);
      this.selectedCuisines.push(theCuisine);
    } else {
      for (var i = 0; i < this.selectedCuisines.length; i++) {
        var theCuisine = this.selectedCuisines[i];
        if (theCuisine.name === extraClicked) {
          this.selectedCuisines.splice(i, 1);
        }
      }
    }
    this.filterByCuisine();
  }

  filterByCuisine() {
    console.log('Selected cuisines: ' + JSON.stringify(this.selectedCuisines))
    if (this.selectedCuisines.length === 0) {
      this.filteredChefs = this.localChefs;
    } else {
      this.localChefs.forEach(supplier => {
        this.selectedCuisines.forEach(selectedC => {
          supplier.cuisines.forEach(supplierC => {
            if (selectedC.name === supplierC.name) {
              if (!this.filteredChefs.includes(supplier)) {
                this.filteredChefs.push(supplier);
              }
            }
          });
        });
      });
    }
  }

  onClickCook(cook: LocalChef) {
    this.router.navigate(['cooks', cook._id]).then();
  }

  fetchChefsByServiceLocation(serviceLocation: ServiceLocation) {
    const chefSearchQuery = {} as ChefSearchQuery;
    chefSearchQuery.serviceAreas = serviceLocation._id;
    this.chefService
      .getAllLocalChefs(chefSearchQuery)
      .subscribe((result: LocalChef[]) => {
        this.localChefs = result;
        this.filteredChefs = this.localChefs;
        this.serviceLocations = [];
      });
  }


  getAddress(cook: LocalChef): string {
    return this.utils.getChefAddress(cook);
  }
}
