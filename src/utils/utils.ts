export function sanitizeFileName(value: string) {
	return value
		.replace(/[:]/g, '')
		.replace(/[*"/\\<>|?]/g, '-');
}

export function logger(message: string) {

	const pluginNamePrefix = 'Gitlab Issues: ';

	console.log(pluginNamePrefix + message);
}

/**
 * Converts GitLab labels to Obsidian tags
 * - Adds # prefix to each label
 * - Converts :: to / for scoped labels
 * - Handles arrays of labels
 */
export function convertLabelsToTags(labels: string | string[]): string {
	if (!labels) return '';
	
	// If labels is a string, split it by commas
	const labelsArray = Array.isArray(labels) ? labels : labels.split(',');
	
	// Convert each label to an Obsidian tag
	return labelsArray.map(label => {
		// Trim whitespace
		const trimmedLabel = label.trim();
		if (!trimmedLabel) return '';
		
		// Convert :: to / for scoped labels
		const tagName = trimmedLabel.replace(/::/g, '/');
		
		// Add # prefix
		return `#${tagName}`;
	}).filter(tag => tag).join(' ');
}

export const DEFAULT_TEMPLATE = `---
id: {{id}}
title: {{{title}}}
dueDate: {{due_date}}
webUrl: {{web_url}}
project: {{references.full}}
---

### {{{title}}}
##### Due on {{due_date}}

{{{description}}}

[View On Gitlab]({{web_url}})
`;
