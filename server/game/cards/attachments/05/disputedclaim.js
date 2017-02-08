const DrawCard = require('../../../drawcard.js');

class DisputedClaim extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            condition: () => (
                this.controller.faction.power >  this.game.getOtherPlayer(this.controller).faction.power
            ),
            effect: [
                ability.effects.modifyStrength(2),
                ability.effects.addKeyword('Renown')
            ]
        });
    }

    canAttach(player, card) {
        if(!(card.hasTrait('Bastard') || card.hasTrait('Lord') || card.hasTrait('Lady'))) {
            return false;
        }
        return super.canAttach(player, card);
    }
}

DisputedClaim.code = '05026';

module.exports = DisputedClaim;
