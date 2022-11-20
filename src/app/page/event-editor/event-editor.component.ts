import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {
  event: Event = new Event();
  constructor(private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>
        this.eventService.get(params['id']).subscribe(
          event => {
            // console.log(event);
            this.event = event || new Event();
          }
        )
    );
  }

  onUpdate(form: NgForm): void {
    //console.log(form.value);
    const event = form.value;
    event.id = this.event?.id;
    this.eventService.update(event).subscribe(
      event => this.router.navigate(['']),
    );
  }


}
