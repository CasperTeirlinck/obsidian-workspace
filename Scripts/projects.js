class Projects {
    constructor() {
        this.utils = require(app.vault.adapter.basePath + "/.scripts/ui.js");
    }

    table(ctx, dv) {
        const projects = dv.pages('"Projects"');

        const headers = ["Client", "Project", "Pinned"]
        dv.table(headers, projects
            .sort(project => project.file.name, "asc")
            .sort(project => project.client, "desc")
            .sort(project => project.pin, "desc")
            .map(project => {
                return [
                    project.client && dv.page(project.client).file.link,
                    `:obs_folder: ${project.file.link}`,
                    this.utils.checkbox(ctx, project.pin),
                ]
            }))
    }
}