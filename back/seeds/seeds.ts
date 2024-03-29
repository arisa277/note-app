import { Knex } from "knex";

interface Note {
    title: string
    content: string
}

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("note").del();

    // Inserts seed entries
    const notes: Note[] = [
        { title: "title1", content: "note1" },
        { title: "title2", content: "note2" },
        { title: "title3", content: "note3" }
    ];

    await knex("note").insert(notes)
};
