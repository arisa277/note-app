import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("note", (table) => {
    table.increments("id").primary()
    table.string("title").notNullable();
    table.text("content").notNullable();
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("note")
}

