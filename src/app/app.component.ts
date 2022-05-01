import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY, Subscription, fromEvent } from 'rxjs';
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
      errorAlert: false,
      weatherIcon: this.weatherIcon,
    },
  ];
  public currentTimeInMilliseconds = Date.now();
  public offlineEvent: Observable<Event>;
  public onlineEvent: Observable<Event>;
  public subscriptions: Subscription[] = [];
  public interval;
  ngOnInit() {
    localStorage.removeItem('dataSource');
    this.handleAppConnectivityChanges();
  }
  private handleAppConnectivityChanges(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(
      this.onlineEvent.subscribe((e) => {
        // handle online mode
        this.interval = setInterval(() => {
          this.currentTimeInMilliseconds = Date.now();
          for (let i = 0; i < this.panelsDetails.length; i++) {
            this.getWeatherUpdate(this.panelsDetails[i]['index']);
            this.panelsDetails[i]['errorAlert'] = false;
          }
        }, 30000);
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe((e) => {
        // handle offline mode
        this.interval = setInterval(() => {
          var retrievedObject = localStorage.getItem('dataSource');
          this.panelsDetails = JSON.parse(retrievedObject);
        }, 30000);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    clearInterval(this.interval);
  }

  public getWeatherUpdate(index) {
    var city = this.searchInput[index];
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
          localStorage.setItem(
            'dataSource',
            JSON.stringify(this.panelsDetails)
          );
        },
        (err) => {
          this.panelsDetails[index] = {
            name: 'Weather Panel ' + oldIndex,
            index: oldIndex,
            weather: 0,
            cityName: '',
            wearherMain: '',
            wearherDesc: '',
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
