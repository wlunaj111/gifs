import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit{

  //private debouncer:Subject<string> = new Subject<string>() //es un tipo especial de observable
  private debouncer= new Subject<string>()
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  // public onValue: EventEmitter<string> = new EventEmitter<string>();
  public onValue = new EventEmitter<string>();

  @Output()
  // public onValue: EventEmitter<string> = new EventEmitter<string>();
  public onDebounce= new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.onDebounce.emit( value );
    })
  }

  ngOnDestroy(): void{
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue(value: string): void {
    this.onValue.emit(value)
  }

  onKeyPress(searchTerm: string){
    this.debouncer.next(searchTerm)
  }
}
