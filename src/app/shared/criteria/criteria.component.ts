import { Component, OnInit, ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() displayDetails: boolean;
  @Input() hitCount: number;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  hitMessage: string;

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  @ViewChild('filterElement') filterElementRef: ElementRef;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits: ' + this.hitCount;
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.filterElementRef.nativeElement.focus();
 }

}

