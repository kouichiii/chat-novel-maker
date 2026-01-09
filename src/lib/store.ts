import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { Story, Character, Message } from './types'

interface StoreState {
    story: Story
    tagsInput: string

    // Metadata actions
    setTitle: (title: string) => void
    setAuthor: (author: string) => void
    setTheme: (theme: Story['theme']) => void
    setTagsInput: (value: string) => void

    // Character actions
    addCharacter: (name: string, color: string) => void
    updateCharacter: (id: string, updates: Partial<Character>) => void
    removeCharacter: (id: string) => void

    // Message actions
    addMessage: (characterId: string, text: string, type?: Message['type']) => void
    updateMessage: (id: string, text: string) => void
    removeMessage: (id: string) => void

    // System
    loadStory: (story: Story) => void
    reset: () => void
}

const DEFAULT_CHARACTERS = [
    { id: 'char_1', name: '私', color: '#E8F5E9' },
    { id: 'char_2', name: '君', color: '#fae3e0ff' }
]

const INITIAL_STORY: Story = {
    id: '',
    title: '新しいストーリー',
    author: 'Unknown',
    theme: 'pop',
    characters: DEFAULT_CHARACTERS,
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
}

export const useStore = create<StoreState>((set) => ({
    story: { ...INITIAL_STORY, id: uuidv4() },
    tagsInput: '',

    setTitle: (title) => set((state) => ({
        story: { ...state.story, title, updatedAt: Date.now() }
    })),

    setAuthor: (author) => set((state) => ({
        story: { ...state.story, author, updatedAt: Date.now() }
    })),

    setTheme: (theme) => set((state) => ({
        story: { ...state.story, theme, updatedAt: Date.now() }
    })),

    setTagsInput: (value) => set(() => ({
        tagsInput: value
    })),

    addCharacter: (name, color) => set((state) => ({
        story: {
            ...state.story,
            characters: [...state.story.characters, { id: uuidv4(), name, color }],
            updatedAt: Date.now()
        }
    })),

    updateCharacter: (id, updates) => set((state) => ({
        story: {
            ...state.story,
            characters: state.story.characters.map((c) => c.id === id ? { ...c, ...updates } : c),
            updatedAt: Date.now()
        }
    })),

    removeCharacter: (id) => set((state) => ({
        story: {
            ...state.story,
            characters: state.story.characters.filter((c) => c.id !== id),
            // Also remove messages from this character? maybe keeping them as unknown is safer or delete
            messages: state.story.messages.filter(m => m.characterId !== id),
            updatedAt: Date.now()
        }
    })),

    addMessage: (characterId, text, type = 'text') => set((state) => ({
        story: {
            ...state.story,
            messages: [...state.story.messages, { id: uuidv4(), characterId, text, type }],
            updatedAt: Date.now()
        }
    })),

    updateMessage: (id, text) => set((state) => ({
        story: {
            ...state.story,
            messages: state.story.messages.map((m) => m.id === id ? { ...m, text } : m),
            updatedAt: Date.now()
        }
    })),

    removeMessage: (id) => set((state) => ({
        story: {
            ...state.story,
            messages: state.story.messages.filter((m) => m.id !== id),
            updatedAt: Date.now()
        }
    })),

    loadStory: (story) => set({ story }),

    reset: () => set({
        story: { ...INITIAL_STORY, id: uuidv4(), createdAt: Date.now(), updatedAt: Date.now() },
        tagsInput: ''
    })
}))
