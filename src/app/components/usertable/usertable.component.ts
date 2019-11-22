import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {DataSource} from '@angular/cdk/collections';
import { User } from '../../models/user.model';
import {debounceTime, distinctUntilChanged, takeUntil, tap} from 'rxjs/operators';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {fromEvent, merge, Subject} from 'rxjs';

@Component({
  selector: 'usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {
  dataSource = new UserDataSource(this.userService);
  displayedColumns = ['name', 'email', 'phone', 'company','action'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild('input', {static: false}) input: ElementRef;
  private _unsubscribeAll: Subject<any>;
  constructor(private userService: UserService) { }
  
  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.sort.sortChange
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
            debounceTime(150),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadAppPage();
            })
        )
        .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => {
                this.loadAppPage();
            })
        )
        .subscribe();
}

loadAppPage(): void {
  const _from = this.paginator.pageIndex * this.paginator.pageSize;
  const _size = this.paginator.pageSize;
  this.dataSource.connect;
}
 


}
export class UserDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }
  connect(): Observable<User[]> {
    return this.userService.getUser();
  }
  disconnect() {}
}