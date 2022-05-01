import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private baseWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private urlSuffix = '&units=metric&APPID=abe1eb51289c21c167c66ce790c2fac3';
  constructor(private http: HttpClient) {}
  public searchInput: any[] = [];
  public weatherIcon: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ex2nxPzrIy4pXDtPa2JHqZn5mOLykVJxmg&usqp=CAU';
  public errorAlert: boolean = false;
  public panelsDetails: Array<Object> = [
    {
      name: 'Weather Panel 1',
      index: 1,
      weather: 0,
      cityName: '',
      panelStatus: false,
      wearherMain: '',
      wearherDesc: '',
      searchInput: 'panel_1',
      errorAlert: false,
      weatherIcon: this.weatherIcon,
    },
    {
      name: 'Weather Panel 2',
      index: 2,
      weather: 0,
      cityName: '',
      panelStatus: false,
      wearherMain: '',
      wearherDesc: '',
      searchInput: 'panel_2',
      errorAlert: false,
      weatherIcon: this.weatherIcon,
    },
    {
      name: 'Weather Panel 3',
      index: 3,
      weather: 0,
      cityName: '',
      panelStatus: false,
      wearherMain: '',
      wearherDesc: '',
      searchInput: 'panel_3',
      errorAlert: false,
      weatherIcon: this.weatherIcon,
    },
    {
      name: 'Weather Panel 4',
      index: 4,
      weather: 0,
      cityName: '',
      panelStatus: false,
      wearherMain: '',
      wearherDesc: '',
      searchInput: 'panel_4',
      errorAlert: false,
      weatherIcon: this.weatherIcon,
    },
    {
      name: 'Weather Panel 5',
      index: 5,
      weather: 0,
      cityName: '',
      panelStatus: false,
      wearherMain: '',
      wearherDesc: '',
      searchInput: 'panel_5',
      errorAlert: false,
      weatherIcon: this.weatherIcon,
    },
    {
      name: 'Weather Panel 6',
      index: 6,
      weather: 0,
      cityName: '',
      panelStatus: false,
      wearherMain: '',
      wearherDesc: '',
      searchInput: 'panel_6',
      errorAlert: false,
      weatherIcon: this.weatherIcon,
    },
    {
      name: 'Weather Panel 7',
      index: 7,
      weather: 0,
      cityName: '',
      panelStatus: false,
      wearherMain: '',
      wearherDesc: '',
      searchInput: 'panel_7',
      errorAlert: false,
      weatherIcon: this.weatherIcon,
    },
    {
      name: 'Weather Panel 8',
      index: 8,
      weather: 0,
      cityName: '',
      panelStatus: false,
      wearherMain: '',
      wearherDesc: '',
      searchInput: 'panel_8',
      errorAlert: false,
      weatherIcon: this.weatherIcon,
    },
    {
      name: 'Weather Panel 9',
      index: 9,
      weather: 0,
      cityName: '',
      panelStatus: false,
      wearherMain: '',
      wearherDesc: '',
      searchInput: 'panel_9',
      errorAlert: false,
      weatherIcon: this.weatherIcon,
    },
  ];
  public currentTimeInMilliseconds = Date.now();
  ngOnInit() {
    // this.battleInit();
    setInterval(() => {
      this.currentTimeInMilliseconds = Date.now();
      for (let i = 0; i < this.panelsDetails.length; i++) {
        this.getWeatherUpdate(this.panelsDetails[i]['index']);
        this.panelsDetails[i]['errorAlert'] = false;
      }
    }, 30000);
  }

  ngOnDestroy() {
    // if (this.id) {
    //   clearInterval(this.id);
    // }
  }
  public getWeatherUpdate(index) {
    var city = this.searchInput[index];
    console.log(city, 'hit' + index);
    var oldIndex = index;
    index = index - 1;
    this.panelsDetails[index]['errorAlert'] = false;
    if (city && city != '') {
      this.http.get(this.baseWeatherURL + city + this.urlSuffix).subscribe(
        (res: any) => {
          this.panelsDetails[index]['weather'] = res['main'].temp;
          this.panelsDetails[index]['cityName'] = res['name'];
          this.panelsDetails[index]['weatherMain'] = res['weather'][0].main;
          this.panelsDetails[index]['wearherDesc'] =
            res['weather'][0].description;
          this.panelsDetails[index]['weatherIcon'] =
            'http://openweathermap.org/img/wn/' +
            res['weather'][0].icon +
            '@2x.png';
        },
        (err) => {
          this.panelsDetails[index] = {
            name: 'Weather Panel ' + oldIndex,
            index: oldIndex,
            weather: 0,
            cityName: '',
            wearherMain: '',
            wearherDesc: '',
            searchInput: 'panel_' + oldIndex,
            panelStatus: true,
            weatherIcon: this.weatherIcon,
          };
          this.panelsDetails[index]['errorAlert'] = true;
          setTimeout(() => {
            this.panelsDetails[index]['errorAlert'] = false;
          }, 3000);
        }
      );
    } else {
      this.panelsDetails[index] = {
        name: 'Weather Panel ' + oldIndex,
        index: oldIndex,
        weather: 0,
        cityName: '',
        wearherMain: '',
        wearherDesc: '',
        searchInput: 'panel_' + oldIndex,
        panelStatus: true,
        weatherIcon: this.weatherIcon,
      };
      this.panelsDetails[index]['errorAlert'] = true;
      setTimeout(() => {
        this.panelsDetails[index]['errorAlert'] = false;
      }, 3000);
    }
  }
}