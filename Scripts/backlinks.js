class BackLinks {
    list(dv) {
        const icons = {
            "Time Sheet": ":obs_clock:",
            "Tasks": ":obs_check_small:",
            "Projects": ":luc_folder:",
            "Notes": ":obs_note_glyph:",
            "Meetings": ":luc_calendar:",
        }

        dv.list(dv.current().file.inlinks.map(link => {
            const page = dv.page(link);
            return `${icons[page.file.folder]} [[${page.file.path}|${page.file.name}]]`
        }
        ))
    }
}