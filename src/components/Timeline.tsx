import { api, RouterOutputs } from "../utils/api";
import { CreateTweet } from "./CreateTweet";
import Image from "next/image";

function Tweet({
  tweet,
}: {
  tweet: RouterOutputs["tweet"]["timeline"][number];
}) {
  return (
    <div className="mb-4 border-b-2 border-gray-500">
      <div className="flex justify-between p-2">
        {tweet.author.image && (
          <Image
            src={tweet.author.image}
            alt={`${tweet.author.name} profile picture`}
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
        <p>{tweet.content}</p>
      </div>
    </div>
  );
}

export function Timeline() {
  const { data } = api.tweet.timeline.useQuery({});

  return (
    <div>
      <CreateTweet />
      {data?.map((tweet) => {
        return <Tweet key={tweet.id} tweet={tweet} />;
      })}
    </div>
  );
}
