import type { Schema, Attribute } from '@strapi/strapi';

export interface UsersUsers extends Schema.Component {
  collectionName: 'components_users_users';
  info: {
    displayName: 'Users';
    icon: 'user';
    description: '';
  };
  attributes: {
    Nom: Attribute.String;
    Email: Attribute.Email;
    Password: Attribute.Password;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'users.users': UsersUsers;
    }
  }
}
