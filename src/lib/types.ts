export type Character = {
    id: string
    name: string
    color: string // Hex color for icon background or theme
    avatarUrl?: string
}

export type Message = {
    id: string
    characterId: string // 'narrator' or character UUID
    text: string
    timestamp?: string
    image?: string // URL if message is an image
    type: 'text' | 'image' | 'sticker'
}

export type Story = {
    id: string
    title: string
    author: string
    theme: 'pop' | 'dark' | 'simple'
    characters: Character[]
    messages: Message[]
    createdAt: number
    updatedAt: number
}
