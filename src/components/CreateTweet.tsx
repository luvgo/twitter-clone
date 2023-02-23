import { FormEvent, useState } from "react";
import { z } from "zod";
import { api } from "../utils/api";

export const tweetSchema = z.object({
  content: z
    .string({
      required_error: "content is required",
    })
    .min(10, "Has To be a minimum Length of 10 characters")
    .max(200, "Has to be more than 200 characters"),
});

export function CreateTweet() {
  const [content, setContent] = useState("");
  const utils = api.useContext();

  const { mutateAsync } = api.tweet.create.useMutation({
    onSuccess: () => {
      setContent("");
      utils.tweet.timeline.invalidate();
    },
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await tweetSchema.parse({ content });
    } catch (err) {
      return;
    }

    mutateAsync({ content });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col rounded-md border-2 p-4"
      >
        <textarea
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 shadow"
          placeholder="Input Tweet"
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-white"
          >
            Tweet
          </button>
        </div>
      </form>
    </>
  );
}
