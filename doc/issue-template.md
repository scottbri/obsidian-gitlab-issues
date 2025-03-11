---
id: {{id}}
iid: {{iid}}
title: {{{title}}}
dueDate: {{due_date}}
webUrl: {{web_url}}
project: {{references.full}}
state: {{state}}
createdAt: {{created_at}}
updatedAt: {{updated_at}}
projectId: {{project_id}}
issueType: {{issue_type}}
severity: {{severity}}
confidential: {{confidential}}
discussionLocked: {{discussion_locked}}
upvotes: {{upvotes}}
downvotes: {{downvotes}}
mergeRequestsCount: {{merge_requests_count}}
userNotesCount: {{user_notes_count}}
imported: {{imported}}
importedFrom: {{imported_from}}
hasTasks: {{has_tasks}}
taskStatus: {{task_status}}
taskCompletionCount: {{task_completion_status.completed_count}}
taskTotalCount: {{task_completion_status.count}}
timeEstimate: {{time_stats.time_estimate}}
timeSpent: {{time_stats.total_time_spent}}
humanTimeSpent: {{time_stats.human_time_spent}}
humanTotalTimeSpent: {{time_stats.human_total_time_spent}}
tags: {{labelsToTags labels}}
---

### {{{title}}}
##### Due on {{due_date}}

{{{description}}}

{{#if assignees.length}}
**Assignees:**
{{#each assignees}}
- {{name}} ({{username}})
{{/each}}
{{/if}}

{{#if author}}
**Author:** {{author.name}} ({{author.username}})
{{/if}}

{{#if milestone}}
**Milestone:** {{milestone.title}} (Due: {{milestone.due_date}})
{{/if}}

{{#if epic}}
**Epic:** {{epic.title}} (ID: {{epic.id}})
{{/if}}

{{#if labels.length}}
**Tags:** {{labelsToTags labels}}
{{/if}}

{{#if has_tasks}}
**Task Completion:** {{task_completion_status.completed_count}}/{{task_completion_status.count}}
{{/if}}

[View On Gitlab]({{web_url}})
