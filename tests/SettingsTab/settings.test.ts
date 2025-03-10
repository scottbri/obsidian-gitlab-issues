import {GitlabIssuesSettings} from "../../src/SettingsTab/settings-types";
import {DEFAULT_SETTINGS, settings} from "../../src/SettingsTab/settings";

describe('DEFAULT_SETTINGS', () => {
	it('should have the correct default values', () => {
		const expectedDefaults: Omit<GitlabIssuesSettings, 'gitlabApiUrl'> = {
			gitlabUrl: 'https://gitlab.com',
			gitlabToken: '',
			gitlabIssuesLevel: 'personal',
			gitlabAppId: '',
			templateFile: '',
			outputDir: '/Gitlab Issues/',
			filter: 'due_date=month',
			showIcon: false,
			purgeIssues: true,
			refreshOnStartup: true,
			intervalOfRefresh: '15',
		};

		expect(DEFAULT_SETTINGS).toEqual({...expectedDefaults, gitlabApiUrl: expect.any(Function)});
	});

	it('gitlabApiUrl should return correct API URL', () => {
		expect(DEFAULT_SETTINGS.gitlabApiUrl()).toBe('https://gitlab.com/api/v4');
	});

	it('should have all required configuration properties', () => {
		const requiredProps = [
			'gitlabUrl',
			'gitlabToken',
			'gitlabIssuesLevel',
			'gitlabAppId',
			'templateFile',
			'outputDir',
			'filter',
			'showIcon',
			'purgeIssues',
			'refreshOnStartup',
			'intervalOfRefresh'
		];

		requiredProps.forEach(prop => {
			expect(DEFAULT_SETTINGS).toHaveProperty(prop);
		});
	});

	it('should have valid default interval refresh value', () => {
		expect(['off', '15', '30', '45', '60', '120']).toContain(DEFAULT_SETTINGS.intervalOfRefresh);
	});
});

describe('gitlabApiUrl', () => {
    it('should handle URLs without protocol', () => {
        const customSettings = {...DEFAULT_SETTINGS, gitlabUrl: 'gitlab.mycompany.com'};
        expect(customSettings.gitlabApiUrl()).toBe('https://gitlab.mycompany.com/api/v4');
    });

    it('should handle URLs with different protocols', () => {
        const httpSettings = {...DEFAULT_SETTINGS, gitlabUrl: 'http://gitlab.mycompany.com'};
        expect(httpSettings.gitlabApiUrl()).toBe('http://gitlab.mycompany.com/api/v4');
    });

    it('should handle URLs with port numbers', () => {
        const portSettings = {...DEFAULT_SETTINGS, gitlabUrl: 'https://gitlab.mycompany.com:8080'};
        expect(portSettings.gitlabApiUrl()).toBe('https://gitlab.mycompany.com:8080/api/v4');
    });

    it('should handle URLs with paths', () => {
        const pathSettings = {...DEFAULT_SETTINGS, gitlabUrl: 'https://mycompany.com/gitlab'};
        expect(pathSettings.gitlabApiUrl()).toBe('https://mycompany.com/gitlab/api/v4');
    });
    it('should handle custom gitlab instance URL', () => {
        const customSettings = {...DEFAULT_SETTINGS, gitlabUrl: 'https://gitlab.mycompany.com'};
        expect(customSettings.gitlabApiUrl()).toBe('https://gitlab.mycompany.com/api/v4');
    });

    it('should handle gitlab URL with trailing slash', () => {
        const customSettings = {...DEFAULT_SETTINGS, gitlabUrl: 'https://gitlab.com/'};
        expect(customSettings.gitlabApiUrl()).toBe('https://gitlab.com/api/v4');
    });
});

describe('settings validation', () => {
    it('should handle empty template file path', () => {
        const templateInput = settings.settingInputs.find(input => input.value === 'templateFile');
        expect(templateInput?.placeholder).toBeDefined();
        expect(DEFAULT_SETTINGS.templateFile).toBe('');
    });

    it('should handle empty gitlab token', () => {
        expect(DEFAULT_SETTINGS.gitlabToken).toBe('');
    });

    it('should validate output directory format', () => {
        const outputInput = settings.settingInputs.find(input => input.value === 'outputDir');
        expect(outputInput?.modifier).toBe('normalizePath');
        expect(DEFAULT_SETTINGS.outputDir).toMatch(/^\/.*\/$/);
    });
});

describe('settings', () => {
	it('should have the correct title', () => {
		expect(settings.title).toBe('GitLab Issues Configuration');
	});

	it('should have the correct setting inputs', () => {
		const expectedSettingInputs = [
			{
				title: 'Gitlab instance URL',
				description: 'Use your own Gitlab instance instead of the public hosted Gitlab.',
				placeholder: 'https://gitlab.com',
				value: 'gitlabUrl',
			},
			{
				title: 'Personal Access Token',
				description: 'Create a personal access token in your Gitlab account and enter it here.',
				placeholder: 'Token',
				value: 'gitlabToken',
			},
			{
				title: 'Template File',
				description: 'Path to an Obsidian note to use as the template.',
				placeholder: 'your-template-file.md',
				value: 'templateFile',
			},
			{
				title: 'Output Folder',
				description: 'Path to an Obsidian folder to write output files to.',
				placeholder: 'Gitlab Issues',
				value: 'outputDir',
				modifier: 'normalizePath',
			},
			{
				title: 'Issues Filter',
				description: 'The query string used to filter the issues.',
				placeholder: 'due_date=month',
				value: 'filter',
			},
		];

		const allInputs = settings.settingInputs;
		expect(allInputs).toHaveLength(5); // Verify total number of inputs
		expect(allInputs[0]).toEqual(expectedSettingInputs[0]);
		expect(allInputs[1]).toEqual(expectedSettingInputs[1]);
		expect(allInputs[2]).toEqual(expectedSettingInputs[2]);

		// Test outputDir setting with modifier
		expect(allInputs[3].modifier).toBe('normalizePath');
		expect(allInputs[3].title).toBe('Output Folder');

		// Test filter setting
		const filterSetting = allInputs[4];
		expect(filterSetting.title).toBe('Issues Filter');
		expect(filterSetting.description).toBe('The query string used to filter the issues.');
		expect(filterSetting.placeholder).toBe('due_date=month');
		expect(filterSetting.value).toBe('filter');

		// Test show icon setting
		const showIconSetting = allInputs[5];
		expect(showIconSetting.title).toBe('Show Gitlab Icon');
		expect(showIconSetting.value).toBe('showIcon');

		// Test purge issues setting
		const purgeSetting = allInputs[6];
		expect(purgeSetting.title).toBe('Purge Issues');
		expect(purgeSetting.value).toBe('purgeIssues');

		// Test refresh interval setting
		const refreshSetting = allInputs[7];
		expect(refreshSetting.title).toBe('Auto Refresh Interval');
		expect(refreshSetting.description).toContain('minutes');
		expect(refreshSetting.value).toBe('intervalOfRefresh');
	});

	it('should properly handle dropdown option changes', () => {
		// Test refresh rate dropdown
		const refreshDropdown = settings.dropdowns[0];
		expect(refreshDropdown.options).toHaveProperty('off');
		expect(refreshDropdown.options).toHaveProperty('15');
		expect(refreshDropdown.options).toHaveProperty('120');
		
		// Test gitlab scope dropdown
		const scopeDropdown = settings.dropdowns[1];
		expect(scopeDropdown.options).toHaveProperty('personal');
		expect(scopeDropdown.options).toHaveProperty('project');
		expect(scopeDropdown.options).toHaveProperty('group');
	});

	it('should validate template file path', () => {
		const templateInput = settings.settingInputs.find(input => input.value === 'templateFile');
		expect(templateInput).toBeDefined();
		expect(templateInput?.placeholder).toBe('your-template-file.md');
		expect(templateInput?.description).toContain('template');
	});

	it('should have checkbox inputs with correct default states', () => {
		const checkboxes = settings.checkBoxInputs;
		expect(checkboxes).toHaveLength(3);

		// Default settings should match checkbox states
		const purgeCheckbox = checkboxes.find(cb => cb.value === 'purgeIssues');
		expect(purgeCheckbox).toBeDefined();
		expect(DEFAULT_SETTINGS.purgeIssues).toBe(true);

		const iconCheckbox = checkboxes.find(cb => cb.value === 'showIcon');
		expect(iconCheckbox).toBeDefined();
		expect(DEFAULT_SETTINGS.showIcon).toBe(false);

		const startupCheckbox = checkboxes.find(cb => cb.value === 'refreshOnStartup');
		expect(startupCheckbox).toBeDefined();
		expect(DEFAULT_SETTINGS.refreshOnStartup).toBe(true);
	});

	it('should have the correct dropdowns', () => {
		const expectedDropdowns = [
			{
				title: 'Refresh Rate',
				description: 'That rate at which gitlab issues will be pulled.',
				options: { off: 'off', '15': '15', '30': '30', '45': '45', '60': '60', '120': '120' },
				value: 'intervalOfRefresh',
			},
			{
				title: 'GitLab Scope',
				description: 'The scope at which the api request will pull.',
				options: { personal: 'Personal', project: 'Project', group: 'Group' },
				value: 'gitlabIssuesLevel',
			},
		];

		expect(settings.dropdowns).toEqual(expectedDropdowns);
	});

	it('should have the correct checkBoxInputs', () => {
		const expectedCheckBoxInputs = [
			{
				title: 'Purge issues that are no longer in Gitlab?',
				value: 'purgeIssues',
			},
			{
				title: 'Show refresh Gitlab issues icon in left ribbon?',
				value: 'showIcon',
			},
			{
				title: 'Should refresh Gitlab issues on Startup?',
				value: 'refreshOnStartup',
			},
		];

		expect(settings.checkBoxInputs).toEqual(expectedCheckBoxInputs);
	});

	it('should correctly return Gitlab Issues Level information', () => {
		expect(settings.getGitlabIssuesLevel('group')).toEqual({
			title: 'Group',
			url: 'https://docs.gitlab.com/ee/user/group/#get-the-group-id',
		});

		expect(settings.getGitlabIssuesLevel('project')).toEqual({
			title: 'Project',
			url: 'https://docs.gitlab.com/ee/user/project/working_with_projects.html#access-the-project-overview-page-by-using-the-project-id',
		});
	});

	it('should have the correct Gitlab documentation information', () => {
		expect(settings.gitlabDocumentation).toEqual({
			title: 'View the Gitlab documentation',
			url: 'https://docs.gitlab.com/ee/api/issues.html#list-issues',
		});
	});
});
