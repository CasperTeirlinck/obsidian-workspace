> Daily logs, checkins, checkouts and timesheets
> Also use the calendar to retrieve daily logs

:luc_home: [[Dashboard]]
# Today
:obs_plus_with_circle: `="[[Logbook/" + dateformat(date(today), "yyyy-MM-dd") + "|Today]]"`
```dataviewjs
customJS.Logbook.tableToday(dv)
```
# All
```dataviewjs
customJS.Logbook.tableAll(dv)
```
