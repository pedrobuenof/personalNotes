import { Input } from "postcss";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const personalNote = createTRPCRouter({
    createNote: publicProcedure.input(
        z.object({
            title: z.string(),
            content: z.string()
        })
    ).mutation(async (opts) => {
        const { input } = opts;

        const note = await db.note.create({
            data: {
                title: input.title,
                content: input.content
            }
        });

        return note;
    }),
    
    listNotes: publicProcedure.query(async () => {
        const notes = await db.note.findMany();

        return notes;
    }),

    showNoteById: publicProcedure.input(
        z.object({
            id: z.number(),
        })
    ).query(async (opts) => {
        
        const { input } = opts
        
        const noteDb = await db.note.findUnique({
            where: {
                id: input.id 
            }
        })

        return noteDb
    }),
})