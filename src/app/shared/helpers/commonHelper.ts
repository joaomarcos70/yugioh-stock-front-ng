import { CardState } from "../enums/cardState.enum";
import { LanguageCard } from "../enums/languageCard.enum";
import { RarityCard } from "../enums/rarityCard.enum";

export class commonHelper {

    getAllCardState(): CardState[]{
        return [
            CardState.NOVA,
            CardState.QUASE_NOVA,
            CardState.POUCO_USADA,
            CardState.USADA_MODERADAMENTE,
            CardState.MUITO_USADA,
            CardState.DANIFICADA
        ]
    }

    transcriptCardState(cardState: CardState){
        switch (cardState){
            case CardState.NOVA:
                return "Nova (M)"

            case CardState.QUASE_NOVA:
                return "Quase nova (NM)"

            case CardState.POUCO_USADA:
                return "Ligeiramente jogada (SP)"

            case CardState.USADA_MODERADAMENTE:
                return "Moderadamente usada (MP)"

            case CardState.MUITO_USADA:
                return "Bastante jogada (HP)"

            case CardState.DANIFICADA:
                return "Danificada (D)"
        }
    }

    getAllLanguageCards(): LanguageCard[]{
        return [
            LanguageCard.ALEMAO,
            LanguageCard.ESPANHOL,
            LanguageCard.FRANCES,
            LanguageCard.INGLES,
            LanguageCard.ITALIANO,
            LanguageCard.PORTUGUES
        ]
    }

    transcriptLanguageCards(languageCard: LanguageCard){
        switch (languageCard){
            case LanguageCard.ALEMAO:
                return "Alemão"

            case LanguageCard.ESPANHOL:
                return "Espanhol"

            case LanguageCard.FRANCES:
                return "Francês"

            case LanguageCard.INGLES:
                return "Inglês"

            case LanguageCard.ITALIANO:
                return "Italiano"

            case LanguageCard.PORTUGUES:
                return "Portugês"
        }
    }

    getAllRarityCards(): RarityCard[] {
        return [
            RarityCard.COMUM,
            RarityCard.GOLD,
            RarityCard.GOLD_SECRET,
            RarityCard.PLATINUM,
            RarityCard.PRISMATIC,
            RarityCard.RARA,
            RarityCard.SECRET,
            RarityCard.SUPER,
            RarityCard.ULTIMATE,
            RarityCard.ULTRA
        ]
    }

    transcriptRarityCards(rarityCard: RarityCard) {
        switch (rarityCard) {
            case RarityCard.COMUM:
                return "Comum";

            case RarityCard.GOLD:
                return "Gold";

            case RarityCard.GOLD_SECRET:
                return "Gold Secret";

            case RarityCard.PLATINUM:
                return "Platinum";

            case RarityCard.PRISMATIC:
                return "Prismatic";

            case RarityCard.RARA:
                return "Rara";

            case RarityCard.SECRET:
                return "Secret";

            case RarityCard.SUPER:
                return "Super";

            case RarityCard.ULTIMATE:
                return "Ultimate";

            case RarityCard.ULTRA:
                return "Ultra";

            default:
                return rarityCard;
        }
    }
}