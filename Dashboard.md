---
.banner: "[[codingbackgroundfire.png]]"
.banner_y: 1
.banner_lock: true
---
> Today's overview
# [[Inbox]] 📥
```tasks
path includes Reminders
not done
```
# [[Logbook]] 🚀
:obs_plus_with_circle: `="[[Logbook/" + dateformat(date(today), "yyyy-MM-dd") + "|Today]]"`
```dataviewjs
customJS.Logbook.tableTodayAndYesterday(dv)
```
# Meetings 📆
:obs_plus_with_circle: `="[[Meetings/Meeting " + dateformat(date(now), "yyyy-MM-dd-HH-mm-ss") + "|Meeting]]"`
```dataviewjs
customJS.Meetings.tableUpcomingAndPinned(this, dv);
```
# Questions ❓
:obs_plus_with_circle: `="[[Questions/Question " + dateformat(date(now), "yyyy-MM-dd-HH-mm-ss") + "|Question]]"`
```dataviewjs
customJS.Questions.tableUnanswered(this, dv)
```
# Notes 📝
:obs_plus_with_circle: `="[[Notes/Note " + dateformat(date(now), "yyyy-MM-dd-HH-mm-ss") + "|Note]]"`
```dataviewjs
customJS.Notes.tablePinnedNotes(dv)
```
# [[Tasks]] ☑️
:obs_plus_with_circle: `="[[Tasks/Task " + dateformat(date(now), "yyyy-MM-dd-HH-mm-ss") + "|Task]]"`
```dataviewjs
customJS.Tasks.tablePlannedToday(this, dv);
```
# [[Logbook|Timesheet]] ⌚
:obs_plus_with_circle: `="[[Time Sheet/" + dateformat(date(now), "yyyy-MM-dd-HH-mm-ss") + "|Ad-Hoc]]"`
#### Today
```dataviewjs
customJS.TimeSheet.table(this, dv, dv.date("today"));
```
#### Yesterday %% fold %%
```dataviewjs
customJS.TimeSheet.table(this, dv, dv.date("yesterday"));
```
# [[Projects]] 📂
:obs_plus_with_circle: `="[[Projects/Project " + dateformat(date(now), "yyyy-MM-dd-HH-mm-ss") + "|Project]]"`
