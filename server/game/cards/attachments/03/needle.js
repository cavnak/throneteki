const DrawCard = require('../../../drawcard.js');

class Needle extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: ability.effects.modifyStrength(2)
        });

        this.interrupt({
            when: {
                onSacrificed: (e, player, card) => card === this.parent
            },
            canCancel: true,
            handler: (context) => {
                context.cancel();
                this.game.addMessage('{0} uses {1} to return {2} to their hand instead of discard', this.controller, this, this.parent);
                this.controller.returnCardToHand(this.parent, false);
                this.controller.sacrificeCard(this);
                
            }
        });
    }

    canAttach(player, card) {
        if(card.getType() !== 'character' || card.getFaction() !== this.getFaction()) {
            return false;
        }
        return super.canAttach(player, card);
    }
}

Needle.code = '03020';

module.exports = Needle;
