import { Input } from "postcss";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const personalNote = createTRPCRouter({
    createNote: publicProcedure.input(
        z.object({
            title: z.string().refine(value => value.trim() !== '', {
                message: 'O título não pode estar vazio ',
                path: ['title'],
            }),
            content: z.string().refine(value => value.trim() !== '' && value.trim() !== '0', {
                message: 'O conteúdo não pode estar vazio ou conter apenas zeros',
                path: ['content'],
            })
        })
    ).mutation(async (opts) => {
        try {
            const { input } = opts;

            if (!input.title || !input.content) {
                throw new Error('Title and content are required.');
            }

            console.log('API - create - before create');
            const note = await db.note.create({
                data: {
                    title: input.title,
                    content: input.content
                }
            });
            console.log(note);
            
            return note;
        } catch (error) {
            console.error('Erro ao criar nota:', error);
            throw new Error('Não foi possível criar a nota.');
        }
        
    }),
    
    listNotes: publicProcedure.query(async () => {
        try {
            console.log('API - list - before list');
            const notes = await db.note.findMany();
            console.log('API - list - after list');
            console.log(notes);
            
            return notes;
        } catch (error) {
            
        }
        
    }),

    showNoteById: publicProcedure.input(
        z.object({
            id: z.number(),
        })
    ).query(async (opts) => {
        try {
            const { input } = opts
        
            console.log('API - showById - before showById');
            const noteDb = await db.note.findUnique({
                where: {
                    id: input.id 
                }
            })
            console.log(noteDb);

            if (!noteDb) {
                throw new Error('Nota não encontrada.');
            }

            return noteDb;
        } catch (error) {
            
        }
        
    }),

    updateNote: publicProcedure.input(
        z.object({
            id: z.number(),
            title: z.string().min(1),
            content: z.string().min(1)
        })
    ).mutation(async (opts) => {
        try {
            const { id, title, content } = opts.input;

            // Buscar a nota atual no banco de dados
            const existingNote = await db.note.findUnique({
                where: { id }
            });

            if (!existingNote) {
                throw new Error('Note not found');
            }

            // Verificar se o conteúdo atualizado é o mesmo que o conteúdo existente
            if ( title === existingNote.title && content === existingNote.content) {
                console.log("entrou dsdasda");
                
                throw new Error('Note title and content is the same, no changes were made');
            }
            
            const validatedData = {
                id,
                title,
                content
            };
            
            console.log('API - update - before update');
            // Atualização da nota no banco de dados
            const updatedNote = await db.note.update({
                where: { id },
                data: validatedData
            });
            console.log('API - update - after update');

            return updatedNote; 
    
        } catch (error) {
            console.error("Error updating note:", error);
            throw new Error('Note title and content is the same, no changes were made')
        }
    }),

    deleteNote: publicProcedure.input(
        z.object({
            id: z.number()
        })
    ).mutation(async(opts) => {
        try {

            const {id} = opts.input

            console.log('API - delete - before delete');
            
            const data = await db.note.delete({
                where: {id}
            })

            console.log('API - delete - after delete');
            

            return data
        } catch (error) {
            console.error("Error deleting note:", error);
            throw new Error("Failed to delete note");
        }
    })
})