/**
 * PostgreSQL Setup Script
 * This script creates the necessary database tables using direct SQL commands
 */
const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// PostgreSQL connection config
const pgConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'dashboard_app'
};

async function setupPostgresSchema() {
  const client = new Client(pgConfig);
  
  try {
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected successfully!');

    // Enable UUID extension
    console.log('Enabling UUID extension...');
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    
    // Create ENUMs
    console.log('Creating ENUM types...');
    
    // Check if ENUMs exist before creating them
    const enumQuery = await client.query(`
      SELECT typname FROM pg_type 
      JOIN pg_catalog.pg_namespace ON pg_namespace.oid = pg_type.typnamespace
      WHERE typname = 'data_feed_type_enum'
    `);
    
    if (enumQuery.rowCount === 0) {
      await client.query(`CREATE TYPE "data_feed_type_enum" AS ENUM ('financial', 'market', 'news', 'social', 'other')`);
      await client.query(`CREATE TYPE "data_feed_status_enum" AS ENUM ('active', 'inactive', 'maintenance')`);
      await client.query(`CREATE TYPE "data_update_frequency_enum" AS ENUM ('realtime', 'hourly', 'daily', 'weekly', 'monthly')`);
      await client.query(`CREATE TYPE "subscription_status_enum" AS ENUM ('active', 'canceled', 'expired', 'trial')`);
      await client.query(`CREATE TYPE "payment_status_enum" AS ENUM ('pending', 'completed', 'failed', 'refunded')`);
      await client.query(`CREATE TYPE "payment_gateway_enum" AS ENUM ('stripe', 'paypal', 'uae_gateway')`);
      await client.query(`CREATE TYPE "referral_status_enum" AS ENUM ('pending', 'completed', 'expired')`);
      console.log('ENUM types created');
    } else {
      console.log('ENUM types already exist');
    }
    
    // Create tables
    console.log('Creating tables...');
    
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "firstName" varchar NOT NULL,
        "lastName" varchar NOT NULL,
        "email" varchar NOT NULL UNIQUE,
        "password" varchar NOT NULL,
        "phone" varchar,
        "role" varchar NOT NULL DEFAULT 'user',
        "status" varchar NOT NULL DEFAULT 'active',
        "avatar" varchar,
        "bio" text,
        "preferences" jsonb,
        "lastLoginAt" timestamp,
        "passwordResetToken" varchar,
        "passwordResetExpires" timestamp,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now()
      )
    `);
    
    // Create plans table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "plans" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" varchar NOT NULL,
        "description" text NOT NULL,
        "price" decimal(10,2) NOT NULL,
        "billingCycle" varchar DEFAULT 'monthly',
        "trialDays" integer DEFAULT 0,
        "status" varchar NOT NULL DEFAULT 'active',
        "isPublic" boolean DEFAULT true,
        "features" jsonb DEFAULT '[]',
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now()
      )
    `);
    
    // Create data_feeds table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "data_feeds" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" varchar NOT NULL,
        "description" text NOT NULL,
        "type" data_feed_type_enum NOT NULL DEFAULT 'other',
        "status" data_feed_status_enum NOT NULL DEFAULT 'active',
        "updateFrequency" data_update_frequency_enum NOT NULL DEFAULT 'daily',
        "sourceUrl" varchar,
        "config" jsonb,
        "isPremium" boolean NOT NULL DEFAULT false,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now()
      )
    `);
    
    // Create subscriptions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "subscriptions" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "planId" uuid NOT NULL,
        "startDate" timestamp NOT NULL,
        "endDate" timestamp NOT NULL,
        "status" subscription_status_enum NOT NULL DEFAULT 'active',
        "canceledAt" timestamp,
        "trialEndsAt" timestamp,
        "nextBillingAt" timestamp,
        "gatewayCustomerId" varchar,
        "gatewaySubscriptionId" varchar,
        "metadata" jsonb,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "FK_users_subscriptions" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_plans_subscriptions" FOREIGN KEY ("planId") REFERENCES "plans" ("id") ON DELETE RESTRICT
      )
    `);
    
    // Create payments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "payments" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "subscriptionId" uuid,
        "amount" decimal(10,2) NOT NULL,
        "status" payment_status_enum NOT NULL DEFAULT 'pending',
        "gateway" payment_gateway_enum NOT NULL,
        "gatewayTransactionId" varchar,
        "gatewayResponse" varchar,
        "receiptUrl" varchar,
        "invoiceId" varchar,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "FK_users_payments" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_subscriptions_payments" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions" ("id") ON DELETE SET NULL
      )
    `);
    
    // Create referrals table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "referrals" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "referrerId" uuid NOT NULL,
        "referredEmail" varchar NOT NULL,
        "referredUserId" uuid,
        "status" referral_status_enum NOT NULL DEFAULT 'pending',
        "code" varchar NOT NULL,
        "expiresAt" timestamp,
        "completedAt" timestamp,
        "reward" jsonb,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "FK_users_referrals_referrer" FOREIGN KEY ("referrerId") REFERENCES "users" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_users_referrals_referred" FOREIGN KEY ("referredUserId") REFERENCES "users" ("id") ON DELETE SET NULL
      )
    `);
    
    // Create junction table for plans and data_feeds
    await client.query(`
      CREATE TABLE IF NOT EXISTS "plan_data_feeds" (
        "planId" uuid NOT NULL,
        "dataFeedId" uuid NOT NULL,
        PRIMARY KEY ("planId", "dataFeedId"),
        CONSTRAINT "FK_plans_junction" FOREIGN KEY ("planId") REFERENCES "plans" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_data_feeds_junction" FOREIGN KEY ("dataFeedId") REFERENCES "data_feeds" ("id") ON DELETE CASCADE
      )
    `);
    
    // Create jwt_tokens table for storing active sessions
    await client.query(`
      CREATE TABLE IF NOT EXISTS "jwt_tokens" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "token" varchar NOT NULL,
        "issuedAt" timestamp NOT NULL DEFAULT now(),
        "expiresAt" timestamp NOT NULL,
        "isRevoked" boolean DEFAULT false,
        "userAgent" varchar,
        "ipAddress" varchar,
        CONSTRAINT "FK_users_jwt_tokens" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE
      )
    `);
    
    // Create user_data_feeds table for storing favorites/access
    await client.query(`
      CREATE TABLE IF NOT EXISTS "user_data_feeds" (
        "userId" uuid NOT NULL,
        "dataFeedId" uuid NOT NULL,
        "isFavorite" boolean DEFAULT false,
        "hasAccess" boolean DEFAULT false,
        "lastAccessedAt" timestamp,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now(),
        PRIMARY KEY ("userId", "dataFeedId"),
        CONSTRAINT "FK_users_data_feeds" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_data_feeds_users" FOREIGN KEY ("dataFeedId") REFERENCES "data_feeds" ("id") ON DELETE CASCADE
      )
    `);
    
    // Create indexes for common queries
    console.log('Creating indexes...');
    await client.query(`CREATE INDEX IF NOT EXISTS "idx_users_email" ON "users" ("email")`);
    await client.query(`CREATE INDEX IF NOT EXISTS "idx_subscriptions_user_id" ON "subscriptions" ("userId")`);
    await client.query(`CREATE INDEX IF NOT EXISTS "idx_payments_user_id" ON "payments" ("userId")`);
    await client.query(`CREATE INDEX IF NOT EXISTS "idx_data_feeds_type" ON "data_feeds" ("type")`);
    await client.query(`CREATE INDEX IF NOT EXISTS "idx_data_feeds_status" ON "data_feeds" ("status")`);
    await client.query(`CREATE INDEX IF NOT EXISTS "idx_jwt_tokens_user_id" ON "jwt_tokens" ("userId")`);
    
    console.log('PostgreSQL database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up PostgreSQL database:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

// Execute the setup
setupPostgresSchema();