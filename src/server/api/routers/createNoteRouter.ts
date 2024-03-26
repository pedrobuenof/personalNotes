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

    updateNote: publicProcedure.input(
        z.object({
            id: z.number(),
            title: z.string(),
            content: z.string()
        })
    ).mutation(async (opts) => {
        try {
            const { id, title, content } = opts.input;
    
            // Validação dos dados
            const validatedData = {
                id,
                title,
                content
            };
    
            // Atualização da nota no banco de dados
            const updatedNote = await db.note.update({
                where: { id },  // Unique identifier for the note
                data: validatedData
            });
    
            return updatedNote; // Retorne a nota atualizada ou qualquer outra resposta necessária
    
        } catch (error) {
            console.error("Error updating note:", error);
            throw new Error("Failed to update note");
        }
    })
})