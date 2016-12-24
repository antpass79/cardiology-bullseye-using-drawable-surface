// https://medium.com/@hasan.hameed/reading-configuration-files-in-angular-2-9d18b7a6aa4#.op9atmm42

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

	constructor(private http: Http) {
	
	}


	load(filename: string): Promise<any> {

		return this.http
			.get('./app/StressEchoComponent/data/' + filename)
           .toPromise()
           .then(response => response.text());
	}
};
