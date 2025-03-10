
import * as Utils from '../../src/utils/utils';
import { Issue } from '../../src/GitlabLoader/issue-types';
import {GitlabIssue} from "../../src/GitlabLoader/issue";



const mockIssue: Issue = {
	id: 1,
	title: 'Test Issue',
	description: 'This is a test issue',
	due_date: '2024-12-31',
	web_url: 'https://gitlab.com/test/test-issue',
	references: 'test-ref',

	_links: {
		self: 'self-link',
		notes: 'notes-link',
		award_emoji: 'award-emoji-link',
		project: 'project-link',
		closed_as_duplicate_of: 'closed-duplicate-link'
	},
	assignees: [],
	author: { id: 1, name: 'author', username: 'author', state: 'active', avatar_url: '', web_url: '', locked: false },
	closed_by: { id: 2, name: 'closer', username: 'closer', state: 'active', avatar_url: '', web_url: '', locked: false },
	confidential: false,
	created_at: '2024-01-01',
	discussion_locked: false,
	downvotes: 0,
	epic: { id: 1, iid: 1, title: 'Epic', group_id: 9, url: "" },
	has_tasks: false,
	iid: 1,
	imported: false,
	imported_from: '',
	issue_type: 'issue',
	labels: ['bug'],
	merge_requests_count: 0,
	milestone: { id: 1, iid: 1, title: 'Milestone', updated_at: '', created_at: "", description: "", due_date: "", project_id:8, state:"" },
	project_id: 1,
	severity: 'low',
	state: 'opened',
	task_completion_status: { count: 0, completed_count: 0 },
	task_status: 'open',
	time_stats: { time_estimate: 0, total_time_spent: 0, human_time_spent: 7, human_total_time_spent: 8 },
	updated_at: '2024-01-02',
	upvotes: 1,
	user_notes_count: 0
};

describe('GitlabIssue', () => {
	it('should correctly assign properties from the issue object', () => {
		const gitlabIssue = new GitlabIssue(mockIssue);

		expect(gitlabIssue.id).toEqual(mockIssue.id);
		expect(gitlabIssue.title).toEqual(mockIssue.title);
		expect(gitlabIssue.description).toEqual(mockIssue.description);
		expect(gitlabIssue.due_date).toEqual(mockIssue.due_date);
		expect(gitlabIssue.web_url).toEqual(mockIssue.web_url);
		expect(gitlabIssue.references).toEqual(mockIssue.references);
		expect(gitlabIssue._links).toEqual(mockIssue._links);
		expect(gitlabIssue.assignees).toEqual(mockIssue.assignees);
		expect(gitlabIssue.author).toEqual(mockIssue.author);
		expect(gitlabIssue.closed_by).toEqual(mockIssue.closed_by);
		expect(gitlabIssue.confidential).toEqual(mockIssue.confidential);
		expect(gitlabIssue.created_at).toEqual(mockIssue.created_at);
		expect(gitlabIssue.discussion_locked).toEqual(mockIssue.discussion_locked);
		expect(gitlabIssue.downvotes).toEqual(mockIssue.downvotes);
		expect(gitlabIssue.epic).toEqual(mockIssue.epic);
		expect(gitlabIssue.has_tasks).toEqual(mockIssue.has_tasks);
		expect(gitlabIssue.iid).toEqual(mockIssue.iid);
		expect(gitlabIssue.imported).toEqual(mockIssue.imported);
		expect(gitlabIssue.imported_from).toEqual(mockIssue.imported_from);
		expect(gitlabIssue.issue_type).toEqual(mockIssue.issue_type);
		expect(gitlabIssue.labels).toEqual(mockIssue.labels);
		expect(gitlabIssue.merge_requests_count).toEqual(mockIssue.merge_requests_count);
		expect(gitlabIssue.milestone).toEqual(mockIssue.milestone);
		expect(gitlabIssue.project_id).toEqual(mockIssue.project_id);
		expect(gitlabIssue.severity).toEqual(mockIssue.severity);
		expect(gitlabIssue.state).toEqual(mockIssue.state);
		expect(gitlabIssue.task_completion_status).toEqual(mockIssue.task_completion_status);
		expect(gitlabIssue.task_status).toEqual(mockIssue.task_status);
		expect(gitlabIssue.time_stats).toEqual(mockIssue.time_stats);
		expect(gitlabIssue.updated_at).toEqual(mockIssue.updated_at);
		expect(gitlabIssue.upvotes).toEqual(mockIssue.upvotes);
		expect(gitlabIssue.user_notes_count).toEqual(mockIssue.user_notes_count);
	});

	it('should correctly sanitize the filename using the title', () => {
		const mockSanitizeFileName = jest.spyOn(Utils, "sanitizeFileName").mockReturnValue('sanitized-Test');
		const gitlabIssue = new GitlabIssue(mockIssue);
		expect(gitlabIssue.filename).toEqual(`sanitized-Test`);
		expect(mockSanitizeFileName).toHaveBeenCalledWith(mockIssue.title);
	});

	it('should handle missing optional properties', () => {
		const minimalIssue: Issue = {
			id: 1,
			title: 'Minimal Issue',
			description: '',
			due_date: '',
			web_url: '',
			references: '',
			_links: {
				self: '',
				notes: '',
				award_emoji: '',
				project: '',
				closed_as_duplicate_of: ''
			},
			assignees: [],
			author: { id: 1, name: '', username: '', state: '', avatar_url: '', web_url: '', locked: false },
			closed_by: null,
			confidential: false,
			created_at: '',
			discussion_locked: false,
			downvotes: 0,
			epic: null,
			has_tasks: false,
			iid: 1,
			imported: false,
			imported_from: '',
			issue_type: '',
			labels: [],
			merge_requests_count: 0,
			milestone: null,
			project_id: 1,
			severity: '',
			state: '',
			task_completion_status: { count: 0, completed_count: 0 },
			task_status: '',
			time_stats: { time_estimate: 0, total_time_spent: 0, human_time_spent: null, human_total_time_spent: null },
			updated_at: '',
			upvotes: 0,
			user_notes_count: 0
		};

		const gitlabIssue = new GitlabIssue(minimalIssue);
		expect(gitlabIssue.epic).toBeNull();
		expect(gitlabIssue.milestone).toBeNull();
		expect(gitlabIssue.closed_by).toBeNull();
		expect(gitlabIssue.time_stats.human_time_spent).toBeNull();
	});

	it('should handle complex references object', () => {
		const issueWithComplexRefs = {...mockIssue};
		issueWithComplexRefs.references = {
			short: '#1',
			relative: 'group/project#1',
			full: 'group/project!1'
		};

		const gitlabIssue = new GitlabIssue(issueWithComplexRefs);
		expect(gitlabIssue.references).toEqual({
			short: '#1',
			relative: 'group/project#1',
			full: 'group/project!1'
		});
	});

	it('should handle arrays of labels correctly', () => {
		const issueWithLabels = {...mockIssue};
		issueWithLabels.labels = ['bug', 'critical', 'needs-review'];

		const gitlabIssue = new GitlabIssue(issueWithLabels);
		expect(gitlabIssue.labels).toHaveLength(3);
		expect(gitlabIssue.labels).toContain('bug');
		expect(gitlabIssue.labels).toContain('critical');
		expect(gitlabIssue.labels).toContain('needs-review');
	});

	it('should handle task completion status correctly', () => {
		const issueWithTasks = {...mockIssue};
		issueWithTasks.has_tasks = true;
		issueWithTasks.task_completion_status = {
			count: 5,
			completed_count: 3
		};

		const gitlabIssue = new GitlabIssue(issueWithTasks);
		expect(gitlabIssue.has_tasks).toBeTruthy();
		expect(gitlabIssue.task_completion_status.count).toBe(5);
		expect(gitlabIssue.task_completion_status.completed_count).toBe(3);
	});

	it('should handle multiple assignees', () => {
		const issueWithAssignees = {...mockIssue};
		issueWithAssignees.assignees = [
			{ id: 1, name: 'First Dev', username: 'dev1', state: 'active', avatar_url: '', web_url: '', locked: false },
			{ id: 2, name: 'Second Dev', username: 'dev2', state: 'active', avatar_url: '', web_url: '', locked: false }
		];

		const gitlabIssue = new GitlabIssue(issueWithAssignees);
		expect(gitlabIssue.assignees).toHaveLength(2);
		expect(gitlabIssue.assignees[0].name).toBe('First Dev');
		expect(gitlabIssue.assignees[1].username).toBe('dev2');
	});

	it('should handle partial time stats data', () => {
		const issueWithPartialStats = {...mockIssue};
		issueWithPartialStats.time_stats = {
			time_estimate: 3600,
			total_time_spent: 1800,
			human_time_spent: '30m',
			human_total_time_spent: null
		};

		const gitlabIssue = new GitlabIssue(issueWithPartialStats);
		expect(gitlabIssue.time_stats.time_estimate).toBe(3600);
		expect(gitlabIssue.time_stats.total_time_spent).toBe(1800);
		expect(gitlabIssue.time_stats.human_time_spent).toBe('30m');
		expect(gitlabIssue.time_stats.human_total_time_spent).toBeNull();
	});

	it('should handle confidential issues', () => {
		const confidentialIssue = {...mockIssue, confidential: true};
		const gitlabIssue = new GitlabIssue(confidentialIssue);
		expect(gitlabIssue.confidential).toBeTruthy();
	});

	it('should preserve author information', () => {
		const issueWithDetailedAuthor = {...mockIssue};
		issueWithDetailedAuthor.author = {
			id: 123,
			name: 'Test Author',
			username: 'testauthor',
			state: 'active',
			avatar_url: 'https://gitlab.com/avatar.jpg',
			web_url: 'https://gitlab.com/testauthor',
			locked: false
		};

		const gitlabIssue = new GitlabIssue(issueWithDetailedAuthor);
		expect(gitlabIssue.author.id).toBe(123);
		expect(gitlabIssue.author.name).toBe('Test Author');
		expect(gitlabIssue.author.username).toBe('testauthor');
		expect(gitlabIssue.author.avatar_url).toBe('https://gitlab.com/avatar.jpg');
		expect(gitlabIssue.author.web_url).toBe('https://gitlab.com/testauthor');
		expect(gitlabIssue.author.locked).toBeFalsy();
	});

	it('should handle different issue states', () => {
		const states = ['opened', 'closed', 'locked'];
		
		for (const state of states) {
			const stateIssue = {...mockIssue, state};
			const gitlabIssue = new GitlabIssue(stateIssue);
			expect(gitlabIssue.state).toBe(state);
		}
	});
});
