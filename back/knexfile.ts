import "dotenv/config"
import type { Knex } from "knex";

const { DB_HOST, DB_PORT, DB_USER, DB_DATABASE } = process.env

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      database: DB_DATABASE
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      database: DB_DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      database: DB_DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
