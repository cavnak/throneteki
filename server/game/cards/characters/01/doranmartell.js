const DrawCard = require('../../../drawcard.js');

class DoranMartell extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: card => card.getFaction() === 'martell' && card !== this && (card.hasTrait('Lord') || card.hasTrait('Lady')),
            effect: ability.effects.dynamicStrength(() => this.controller.plotDiscard.size())
        });
    }
}

DoranMartell.code = '01105';

module.exports = DoranMartell;
