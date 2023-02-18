import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const tweetRouter = createTRPCRouter({
  create: protectedProcedure
  .input(
    z.object({
      content: z.string({
        required_error: "content is required"
      })
    })
  )
  .mutation(({ ctx, input }) => {
    const { prisma, session } = ctx;
    const { content } = input;

    const userId = session.user.id;

    return prisma.tweet.create({
      data: {
        content,
        author: {
          connect: {
            id: userId
          }
        }
      }
    })
  })
});
