import { Country } from './../../interfaces/country';
import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-pages',
  templateUrl: './country-pages.component.html',
  styles: [
  ]
})
export class CountryPagesComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router : Router
    ){}

    ngOnInit(): void {

      this.activatedRoute.params
        .pipe(
          switchMap(({id}) => this.countriesService.searchCountryByAlphaCode( id )),
        )
        .subscribe( country => {
          if (!country) return this.router.navigateByUrl('');
          return this.country = country
          //return
        });
    }

  // ngOnInit(): void {
  //   this.activatedRoute.params.subscribe( ({id}) => {
  //     this.countriesService.searchCountryByAlphaCode(id).subscribe( country => {
  //       console.log({country})
  //     })
  //     console.log({params: id})
  //   })
  // }

}
