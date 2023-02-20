import { z } from "zod";
import { tweetSchema } from "../../../components/CreateTweet";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const tweetRouter = createTRPCRouter({
  create: protectedProcedure
  .input(
    tweetSchema
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
