const SEARCH_SCOPE = '';
const DELIM = '~:~';

const formatScopedString = (input: string) => {
	return `${SEARCH_SCOPE}${DELIM}${input}`;
};

const parseScopedString = (input: string) => {
	return input.split(DELIM).pop();
};

export {formatScopedString, parseScopedString, DELIM, SEARCH_SCOPE};
