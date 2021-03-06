const DrawCard = require('../../../drawcard.js');

class HisViperEyes extends DrawCard {
    canPlay(player, card) {
        if(player !== this.controller || this !== card) {
            return false;
        }

        if(!this.game.currentChallenge || this.game.currentChallenge.winner === this.controller || 
                (this.game.currentChallenge.challengeType !== 'military' && this.game.currentChallenge.challengeType !== 'power')) {
            return false;
        }

        return true;
    }

    play(player) {
        if(this.controller !== player) {
            return;
        }

        var otherPlayer = this.game.getOtherPlayer(player);
        if(!otherPlayer) {
            return;
        }

        var buttons = otherPlayer.hand.map(card => {
            return { text: card.name, method: 'cardSelected', arg: card.uuid, card: card.getSummary(true) };
        });

        buttons.push({ text: 'Cancel', method: 'cancel' });

        this.game.promptWithMenu(player, this, {
            activePrompt: {
                menuTitle: 'Select a card to discard',
                buttons: buttons
            },
            waitingPromptTitle: 'Waiting for opponent to use ' + this.name
        });
    }

    cardSelected(player, cardId) {
        var otherPlayer = this.game.getOtherPlayer(player);
        if(!otherPlayer) {
            return false;
        }

        var card = otherPlayer.findCardByUuid(otherPlayer.hand, cardId);
        if(!card) {
            return false;
        }

        otherPlayer.discardCard(card);

        this.game.addMessage('{0} uses {1} to discard {2} from {3}\'s hand', player, this, card, otherPlayer);

        return true;
    }

    cancel(player) {
        this.game.addMessage('{0} cancels the resolution of {1}', player, this);

        return true;
    }    
}

HisViperEyes.code = '03032';

module.exports = HisViperEyes;
