// amplify/lib/services/index.ts
// Export all shared services for easy importing
export { DynamoDBService, type DynamoDBItem } from "./dynamodb-service";
export {
  itemSchemas,
  getSchemaForType,
  formatValidationError,
  type ProfileItem,
  type VenueItem,
  type BookingItem,
  type WishlistItem,
  type ContactItem,
} from "./schemas";

