'use strict';

/**
 * paiement service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::paiement.paiement');
