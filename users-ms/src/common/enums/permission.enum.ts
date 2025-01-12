/**
 * Permission types supported by the application
 */
export enum Permission {
  // User permissions
  READ_USER = 'read:user',
  CREATE_USER = 'create:user',
  UPDATE_USER = 'update:user',
  DELETE_USER = 'delete:user',
  
  // Product permissions
  READ_PRODUCT = 'read:product',
  CREATE_PRODUCT = 'create:product',
  UPDATE_PRODUCT = 'update:product',
  DELETE_PRODUCT = 'delete:product',
  
  // Order permissions
  READ_ORDER = 'read:order',
  CREATE_ORDER = 'create:order',
  UPDATE_ORDER = 'update:order',
  DELETE_ORDER = 'delete:order',
} 