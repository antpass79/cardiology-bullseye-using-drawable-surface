// https://medium.com/@hasan.hameed/reading-configuration-files-in-angular-2-9d18b7a6aa4#.op9atmm42

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DataService {

	constructor(private http: Http) {
	
	}


	load(filename: string): Promise<any> {

		return this.http
			.get('./assets/data/' + filename)
           .toPromise()
           .then(response => response.text());
	}
};
