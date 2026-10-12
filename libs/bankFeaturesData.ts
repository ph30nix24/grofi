/**
 * Bank Features and Benefits Data Facade
 * Types and bank dataset are modularized in libs/bankFeatures/
 */

export * from "./bankFeatures/types";
export { BANK_FEATURES_DATA } from "./bankFeatures/banksData";
export { getBankFeatures, getAllBankFeatures } from "./bankFeatures/banksData";
