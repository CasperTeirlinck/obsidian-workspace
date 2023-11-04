---
Project: 
Status: ⚪
Status Message: 
Deadline: 
Planned: 
Priority: 
Devops: 
tags:
---
Worked Today: `$= customJS.Task.workedOnToday(dv)`
Planned Today: `$= customJS.Task.plannedToday(dv)`
Overdue: `$= customJS.Task.overDue(dv)`
## Notes 📝
```dataviewjs
customJS.Notes.tableRelatedToCurrent(dv);
```
## Tasks ☑️
```dataviewjs
customJS.Tasks.tableRelatedToCurrent(this, dv);
```
## Time Blocks ⌚
:obs_plus_with_circle: `="[[Time Sheet/" + dateformat(date(now), "yyyy-MM-dd-HH-mm-ss") + "|Time Block]]"`
```dataviewjs
customJS.Task.timeBlocks(dv);
```
# Task
