Gitlab Issues for Obsidian
====

![CI](https://github.com/benr77/obsidian-gitlab-issues/actions/workflows/ci.yml/badge.svg)
![Build Status](https://github.com/benr77/obsidian-gitlab-issues/actions/workflows/releases.yml/badge.svg)
[![Github All Releases](https://img.shields.io/github/downloads/benr77/obsidian-gitlab-issues/total.svg)]()

A plugin for [Obsidian](https://obsidian.md/) to import issues from [Gitlab](https://gitlab.com/).

Each issue returned from Gitlab is created as an Obsidian note in the specified output directory.

You can create your own template to customise the format of the issue note.

Notes are intended to be *READ ONLY*, as they will be removed from your Obsidian vault if they no longer are 
returned by Gitlab.

The latest issues are loaded from Gitlab 30 seconds after Obsidian is started, and then automatically every 15 minutes.

## Configuration

You must have a Gitlab account.

1) Generate a Gitlab [Personal Access Token](https://gitlab.com/-/profile/personal_access_tokens) for the plugin that 
   has `API` scope included.
2) Install the plugin through the Obsidian Community Plugins section, and then enable it.
3) Enter the Personal Access Token you created at Gitlab into the Token field in the plugin settings.

![Plugin Settings Screen](doc/screenshot/gitlab-issues-config-screen.png)

## Example - Listing upcoming deadlines

With the default filter value of `due_date=month`, the Gitlab API will return all issues that have a Due Date in the 
next month.

The plugin will create an Obsidian note file for each issue.

You can then use the excellent [DataView Plugin](https://github.com/blacksmithgu/obsidian-dataview) to create lists 
of upcoming issues to embed anywhere you like in your vault. For example:

```yaml
dataview
TABLE WITHOUT ID file.link AS "Task", dueDate AS "Due Date" from "@Data/Gitlab Issues"
SORT dueDate
```

If you then close an issue on Gitlab, or change its due date to be further in the future, the issue will be removed 
from your vault, and the DataView list will no longer show the issue.

## Going Further

### Customise the API query
You can use any valid query filter permitted by Gitlab in the "Issues List" endpoint. See the [Gitlab API 
Documentation](https://docs.gitlab.com/ee/api/issues.html#list-issues) for all possible options.

### Use a custom template
You can customise the template used to create the new notes. Create a note for the template, and specify the path 
to this note in the plugin settings.

The template must be a valid Handlebars template. See the [Handlebars](https://handlebarsjs.com/guide/) documentation 
for more information on the syntax.

Currently, the available fields include:

### Basic Issue Information
- `id` - The issue ID
- `iid` - The internal issue ID
- `title` - The issue title
- `description` - The issue description
- `due_date` - The due date of the issue
- `web_url` - The URL to view the issue on GitLab
- `state` - The current state of the issue (e.g., "opened", "closed")
- `created_at` - When the issue was created
- `updated_at` - When the issue was last updated
- `project_id` - The ID of the project the issue belongs to
- `issue_type` - The type of the issue
- `severity` - The severity of the issue
- `confidential` - Whether the issue is confidential
- `discussion_locked` - Whether discussion is locked on the issue
- `upvotes` - Number of upvotes
- `downvotes` - Number of downvotes
- `merge_requests_count` - Number of related merge requests
- `user_notes_count` - Number of user notes/comments
- `imported` - Whether the issue was imported
- `imported_from` - Where the issue was imported from
- `has_tasks` - Whether the issue has tasks
- `task_status` - The status of tasks in the issue
- `labels` - The labels applied to the issue (raw array)
- `labelsToTags labels` - Helper that converts GitLab labels to Obsidian tags (adds # prefix and converts :: to /)

### References
- `references.short` - Short reference
- `references.relative` - Relative reference
- `references.full` - Full reference

### People
- `assignees` - Array of assignees (each with `avatar_url`, `id`, `locked`, `name`, `state`, `username`, `web_url`)
- `author` - The author of the issue (with `avatar_url`, `id`, `locked`, `name`, `state`, `username`, `web_url`)
- `closed_by` - Who closed the issue (with `avatar_url`, `id`, `locked`, `name`, `state`, `username`, `web_url`)

### Task Status
- `task_completion_status.count` - Total number of tasks
- `task_completion_status.completed_count` - Number of completed tasks

### Time Tracking
- `time_stats.time_estimate` - Estimated time
- `time_stats.total_time_spent` - Total time spent
- `time_stats.human_time_spent` - Human-readable time spent
- `time_stats.human_total_time_spent` - Human-readable total time spent

### Related Items
- `epic` - Related epic (with `id`, `iid`, `title`, `url`, `group_id`)
- `milestone` - Related milestone (with same fields as a basic issue)

### Links
- `_links.self` - Link to the issue
- `_links.notes` - Link to the issue notes
- `_links.award_emoji` - Link to the issue award emoji
- `_links.project` - Link to the project
- `_links.closed_as_duplicate_of` - Link to the issue this was closed as a duplicate of

## Bugs

Please report bugs right here in the repository [issues](https://github.com/benr77/obsidian-gitlab-issues/issues) section.

## Contributions

Contributions are welcome. Please submit a single PR per bug or feature.

## License

The plugin code is released under the MIT license. See the [LICENSE](LICENSE.txt) document for more information.
