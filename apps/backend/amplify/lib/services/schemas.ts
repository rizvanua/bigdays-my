// amplify/lib/services/schemas.ts
import { z } from "zod";

// Base schema for all DynamoDB items
export const baseItemSchema = z.object({
  id: z.string().min(1, "ID is required"),
  type: z.string().min(1, "Type is required"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Schema registry for different item types
export const itemSchemas = {
  // User profile schema
  profile: baseItemSchema.extend({
    type: z.literal("profile"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().optional(),
    avatar: z.string().url("Invalid avatar URL").optional(),
    userId: z.string().min(1, "User ID is required").optional(),
  }),

  // Venue schema
  venue: baseItemSchema.extend({
    type: z.literal("venue"),
    name: z.string().min(1, "Venue name is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    capacity: z.number().int().positive("Capacity must be a positive integer"),
    price: z.number().nonnegative("Price cannot be negative").optional(),
    amenities: z.array(z.string()).optional(),
    images: z.array(z.string().url()).optional(),
    description: z.string().optional(),
  }),

  // Booking schema
  booking: baseItemSchema.extend({
    type: z.literal("booking"),
    venueId: z.string().min(1, "Venue ID is required"),
    userId: z.string().min(1, "User ID is required"),
    date: z.string().datetime("Invalid date format").or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")),
    status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
    guests: z.number().int().positive("Guests must be a positive integer"),
    totalPrice: z.number().nonnegative("Total price cannot be negative").optional(),
    notes: z.string().optional(),
  }),

  // Wishlist item schema
  wishlist: baseItemSchema.extend({
    type: z.literal("wishlist"),
    userId: z.string().min(1, "User ID is required"),
    itemId: z.string().min(1, "Item ID is required"),
    itemType: z.string().min(1, "Item type is required"),
    category: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
  }),

  // Contact/Inquiry schema
  contact: baseItemSchema.extend({
    type: z.literal("contact"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().optional(),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
    status: z.enum(["new", "read", "replied", "archived"]).optional(),
  }),

  // Generic item schema (for flexible types)
  default: baseItemSchema.passthrough(), // Allows additional fields
};

// Type inference from schemas
export type ProfileItem = z.infer<typeof itemSchemas.profile>;
export type VenueItem = z.infer<typeof itemSchemas.venue>;
export type BookingItem = z.infer<typeof itemSchemas.booking>;
export type WishlistItem = z.infer<typeof itemSchemas.wishlist>;
export type ContactItem = z.infer<typeof itemSchemas.contact>;

// Helper function to get schema by type
export function getSchemaForType(type: string): z.ZodSchema {
  return itemSchemas[type as keyof typeof itemSchemas] || itemSchemas.default;
}

// Validation error formatter
export function formatValidationError(error: z.ZodError): string {
  return error.errors
    .map((e) => {
      const path = e.path.join(".");
      return `${path}: ${e.message}`;
    })
    .join(", ");
}

