import { offset } from '@popperjs/core'
import { AttributeCard } from '../shared/enums/attributeCard.enum'

export interface CardSet {
    set_name?: string
    set_code?: string
    set_rarity?: string
    set_rarity_code?: string
    set_price?: string
}

export interface CardImage {
    id?: number
    image_url?: string
    image_url_small?: string
}

export interface CardInterface {
    num: number
    offset: number
    id?: number
    name?: string
    fname?: string
    type?: string
    desc?: string
    atk?: number
    def?: number
    level?: number
    race?: string
    attribute?: AttributeCard
    card_sets?: CardSet[]
    card_images?: CardImage[]
}

export interface RootObject {
    data?: CardInterface[]
    meta?: {
        generated?: string
        current_rows?: number
        total_rows?: number
        rows_remaining?: number
        total_pages?: number
        pages_remaining?: number
        next_page?: string
        next_page_offset?: number
        previous_page?: string
    }
}
