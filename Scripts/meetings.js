class Meetings {
    constructor() {
        this.utils = require(app.vault.adapter.basePath + "/.scripts/utils.js");
        this.utilsUI = require(app.vault.adapter.basePath + "/.scripts/ui.js");
        this.utilsMeetings = require(app.vault.adapter.basePath + "/.scripts/meetings.js");
    }

    table(ctx, dv, meetings) {
        const headers = ["Date", "Meeting", "Project", "Pinned"]
        dv.table(headers, meetings
            .sort(meetings => meetings.date, "desc")
            .map(meeting => {
                const dateFormatted = this.utils.formatRelativeDate(meeting.date);

                return [
                    dateFormatted,
                    `:luc_calendar: ${meeting.file.link}`,
                    meeting.project,
                    this.utilsUI.checkbox(ctx, meeting.pin)
                ]
            })
        )
    }

    tableUpcomingAndPinned(ctx, dv) {
        const meetingsUpcoming = this.utilsMeetings.getUpcomingMeetings(dv);
        const meetingsPinned = this.utilsMeetings.getPinnedMeetings(dv);

        dv.span("Upcoming");
        this.table(ctx, dv, meetingsUpcoming);

        dv.el("br");
        dv.span("Pinned");
        this.table(ctx, dv, meetingsPinned);
    }
    tableRelatedToCurrent(ctx, dv) {
        return this.table(ctx, dv, this.utilsMeetings.getMeetingsRelated(dv, dv.current()));
    }
}