import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { faCode, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { Cuisine, LocalChef } from 'src/app/model/localchef';
import { ServiceLocation } from 'src/app/model/ServiceLocation';
import { ChefService } from 'src/app/services/chef.service';
import { ContextService } from 'src/app/services/context.service';
import { CuisinesService } from 'src/app/services/cusines.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  subtitle: string;
  serviceLocations: ServiceLocation[] = [];
  showServiceLocations: boolean = false;
  serviceLocationSearchText: string = '';
  selectedServiceLocation: ServiceLocation | undefined;
  localChefs: LocalChef[] = [];
  popularLocations: ServiceLocation[];
  cuisines: Cuisine[] = [];
  cuisineMap: Map<String, Cuisine> = new Map<String, Cuisine>();
  faHandshake = faHandshake;
  faCode = faCode;

  constructor(
    private locationService: LocationService,
    private chefService: ChefService,
    private contextService: ContextService,
    private cuisinesService: CuisinesService,
    private router: Router
  ) {
    this.subtitle = 'This is some text within a card block.';
  }

  ngOnInit() {
    this.fetchPopularLocations('Glasgow');
    this.cuisinesService.getCuisines().subscribe((d) => {
      this.cuisines = d;
      for (var i = 0; i < d.length; i++) {
        var theCuisine = d[i];
        this.cuisineMap.set(theCuisine.name, theCuisine);
      }
    });
  }

  closeServiceLocations() {
    this.showServiceLocations = false;
    this.serviceLocationSearchText = undefined;
  }

  fetchPopularLocations(searchString: string) {
    if (searchString === null && searchString === undefined) {
      return;
    }
    this.locationService
      .fetchLocalAreas(searchString.trim())
      // .pipe(first())
      .subscribe(
        (data: ServiceLocation[]) => {
          this.popularLocations = data;
        },
        (error) => {
          console.log(
            'Popular Locations Lookup resulted an error.' +
            JSON.stringify(error)
          );
        }
      );
  }

  lookupServiceLocation(searchString: string) {
    if (searchString === null && searchString === undefined) {
      return;
    }
    this.locationService
      .fetchLocalAreas(searchString.trim())
      // .pipe(first())
      .subscribe(
        (data: ServiceLocation[]) => {
          this.serviceLocations = data;
          this.showServiceLocations = true;
          console.log(
            'The service location List: ' +
            JSON.stringify(this.serviceLocations)
          );
        },
        (error) => {
          console.log(
            'Address Lookup resulted an error.' + JSON.stringify(error)
          );
        }
      );
  }

  fetchAllServiceAreas() {
    this.locationService
      .fetchLocalAreas('Glasgow')
      // .pipe(first())
      .subscribe(
        (data: ServiceLocation[]) => {
          this.serviceLocations = data;
          this.showServiceLocations = true;
          console.log(
            'The service location List: ' +
            JSON.stringify(this.showServiceLocations)
          );
        },
        (error) => {
          console.log(
            'Address Lookup resulted an error.' + JSON.stringify(error)
          );
        }
      );
  }

  onSelectServiceLocation(selectedServiceLocation: ServiceLocation) {
    this.selectedServiceLocation = selectedServiceLocation;
    this.contextService.selectLocation(this.selectedServiceLocation);
    // this.fetchChefsByServiceLocation(selectedServiceLocation);
    this.router
      .navigate(['cooks'], {
        queryParams: { location: selectedServiceLocation.slug },
      })
      .then();
    console.log('Selected location: ' + selectedServiceLocation.name);
  }

  // fetchChefsByServiceLocation(serviceLocation: ServiceLocation) {
  //   const chefSearchQuery = {} as ChefSearchQuery;
  //   chefSearchQuery.serviceAreas = serviceLocation._id;
  //   this.chefService
  //     .getAllLocalChefs(chefSearchQuery)
  //     .subscribe((result: LocalChef[]) => {
  //       this.localChefs = result;
  //       this.serviceLocations = [];
  //       this.showServiceLocations = false;
  //       console.log('Got ' + this.localChefs.length + ' chefs on this area');
  //       // if ( this.localChefs === null || this.localChefs === undefined || this.localChefs.length === 0){
  //       //   this.buildNotificationMessage();
  //       // }
  //     });
  // }

  onEnter() {
    if ( this.serviceLocationSearchText !== undefined){
      this.lookupServiceLocation(this.serviceLocationSearchText);
    }
   
  }

  ngAfterViewInit() { }
}
