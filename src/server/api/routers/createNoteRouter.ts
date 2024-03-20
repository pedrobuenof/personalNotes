import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const createNote = createTRPCRouter({
    createNote: publicProcedure.input(
        z.object({
            title: z.string(),
            content: z.string()
        })
    ).mutation(async (opts) => {
        const { input } = opts

        const note = await db.note.create({
            data: {
                title: input.title,
                content: input.content
            }
        })
    })
})