/**
 * Seed data script for PostgreSQL
 * This script inserts some initial data into the database tables
 */
const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs'); // Using bcryptjs instead of bcrypt
const { v4: uuidv4 } = require('uuid');

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

async function seedDatabase() {
  const client = new Client(pgConfig);
  
  try {
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected successfully!');

    // Create admin user
    console.log('Adding admin user...');
    const hashedPassword = await bcrypt.hash('Admin@123', 12);
    
    // Check if admin user already exists
    const adminCheck = await client.query(`SELECT id FROM "users" WHERE email = 'admin@example.com'`);
    
    if (adminCheck.rowCount === 0) {
      await client.query(`
        INSERT INTO "users" 
        (id, "firstName", "lastName", email, password, role, status, bio, "createdAt", "updatedAt")
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, now(), now())
      `, [
        uuidv4(),
        'Admin',
        'User',
        'admin@example.com',
        hashedPassword,
        'admin',
        'active',
        'System administrator account'
      ]);
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    // Create regular user
    console.log('Adding regular user...');
    const regularUserPassword = await bcrypt.hash('User@123', 12);
    
    const userCheck = await client.query(`SELECT id FROM "users" WHERE email = 'user@example.com'`);
    
    if (userCheck.rowCount === 0) {
      await client.query(`
        INSERT INTO "users"
        (id, "firstName", "lastName", email, password, role, status, bio, "createdAt", "updatedAt")
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, now(), now())
      `, [
        uuidv4(),
        'Regular',
        'User',
        'user@example.com',
        regularUserPassword,
        'user',
        'active',
        'Regular user account'
      ]);
      console.log('Regular user created');
    } else {
      console.log('Regular user already exists');
    }
    
    // Create subscription plans
    console.log('Adding subscription plans...');
    
    const basicPlanCheck = await client.query(`SELECT id FROM "plans" WHERE name = 'Basic Plan'`);
    
    if (basicPlanCheck.rowCount === 0) {
      const basicPlanId = uuidv4();
      await client.query(`
        INSERT INTO "plans"
        (id, name, description, price, "billingCycle", "trialDays", status, "isPublic", features)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        basicPlanId,
        'Basic Plan',
        'Access to basic dashboard features',
        9.99,
        'monthly',
        7,
        'active',
        true,
        JSON.stringify(['Basic Analytics', 'Limited Data Feeds', 'Email Support'])
      ]);
      console.log('Basic plan created');
  
      const proPlanId = uuidv4();
      await client.query(`
        INSERT INTO "plans"
        (id, name, description, price, "billingCycle", "trialDays", status, "isPublic", features)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        proPlanId,
        'Pro Plan',
        'Enhanced dashboard with more features',
        24.99,
        'monthly',
        7,
        'active',
        true,
        JSON.stringify(['Advanced Analytics', 'Full Data Feed Access', 'Priority Support', 'Custom Reports'])
      ]);
      console.log('Pro plan created');
      
      const enterprisePlanId = uuidv4();
      await client.query(`
        INSERT INTO "plans"
        (id, name, description, price, "billingCycle", "trialDays", status, "isPublic", features)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        enterprisePlanId,
        'Enterprise Plan',
        'Full access to all dashboard features',
        99.99,
        'monthly',
        14,
        'active',
        false,
        JSON.stringify(['Complete Analytics Suite', 'API Access', 'Dedicated Support', 'Custom Integrations', 'White Labeling'])
      ]);
      console.log('Enterprise plan created');
    } else {
      console.log('Plans already exist');
    }
    
    // Create data feeds
    console.log('Adding data feeds...');
    
    const dataFeedCheck = await client.query(`SELECT id FROM "data_feeds" WHERE name = 'Financial Markets'`);
    
    if (dataFeedCheck.rowCount === 0) {
      // Financial data feed
      await client.query(`
        INSERT INTO "data_feeds"
        (id, name, description, type, status, "updateFrequency", "sourceUrl", "isPremium", config)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        uuidv4(),
        'Financial Markets',
        'Real-time financial market data including stocks, bonds, and commodities',
        'financial',
        'active',
        'realtime',
        'https://api.example.com/financial',
        true,
        JSON.stringify({ apiKey: 'sample_key', refreshRate: 60, dataPoints: ['NASDAQ', 'DOW', 'S&P500'] })
      ]);
      
      // Market data feed
      await client.query(`
        INSERT INTO "data_feeds"
        (id, name, description, type, status, "updateFrequency", "sourceUrl", "isPremium", config)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        uuidv4(),
        'Market Trends',
        'Analysis of market trends and industry movements',
        'market',
        'active',
        'daily',
        'https://api.example.com/market-trends',
        false,
        JSON.stringify({ refreshRate: 86400, categories: ['Tech', 'Healthcare', 'Finance', 'Energy'] })
      ]);
      
      // News data feed
      await client.query(`
        INSERT INTO "data_feeds"
        (id, name, description, type, status, "updateFrequency", "sourceUrl", "isPremium", config)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        uuidv4(),
        'Industry News',
        'Latest news from various industries',
        'news',
        'active',
        'hourly',
        'https://api.example.com/news',
        false,
        JSON.stringify({ refreshRate: 3600, sources: ['Reuters', 'Bloomberg', 'CNBC'] })
      ]);
      
      // Social data feed
      await client.query(`
        INSERT INTO "data_feeds"
        (id, name, description, type, status, "updateFrequency", "sourceUrl", "isPremium", config)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        uuidv4(),
        'Social Media Trends',
        'Trending topics and sentiment analysis from social media',
        'social',
        'active',
        'hourly',
        'https://api.example.com/social',
        true,
        JSON.stringify({ platforms: ['Twitter', 'Reddit', 'LinkedIn'], metrics: ['Sentiment', 'Volume', 'Engagement'] })
      ]);
      
      console.log('Data feeds created');
    } else {
      console.log('Data feeds already exist');
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

// Execute the seed function
seedDatabase();