'use strict';

/**
 * gerant service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gerant.gerant');
