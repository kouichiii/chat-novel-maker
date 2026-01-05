export const LIMITS = {
    TITLE_MAX_LENGTH: 50,
    AUTHOR_MAX_LENGTH: 30,
    CHARACTER_NAME_MAX_LENGTH: 20,
    MAX_CHARACTERS: 8,
    MESSAGE_MAX_LENGTH: 200, // 140 is typical but 200 is safer for longer chat
    MAX_MESSAGES: 100,
} as const;
