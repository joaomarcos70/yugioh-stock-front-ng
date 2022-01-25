
    export interface CardSet {
        set_name?: string;
        set_code?: string;
        set_rarity?: string;
        set_rarity_code?: string;
        set_price?: string;
    }

    export interface CardImage {
        id?: number;
        image_url?: string;
        image_url_small?: string;
    }

    export interface CardInterface {
        id?: number;
        name?: string;
        fname?: string;
        type?: string;
        desc?: string;
        atk?: number;
        def?: number;
        level?: number;
        race?: string;
        attribute?: string;
        card_sets?: CardSet[];
        card_images?: CardImage[];
    }

    export interface RootObject {
        data?: CardInterface[];
    }


