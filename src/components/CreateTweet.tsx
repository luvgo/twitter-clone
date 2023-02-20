import { ErrorInfo, useState } from "react"
import { z } from "zod"
import { api } from "../utils/api"

export const tweetSchema = z.object({
    content: z.string({
    required_error: "content is required"
    })
    .min(10, "Has To be a minimum Length of 10 characters")
    .max(200, "Has to be more than 200 characters")
})

export function CreateTweet(){
    const [content, setContent] = useState("")
    const [error, setError] = useState("")

    const { mutateAsync } = api.tweet.create.useMutation()

    async function handleSubmit(e){
        e.preventDefault();

        try{
            await tweetSchema.parse({ content })
        } catch (err) {
            setError(err)
            return
        }

        mutateAsync({ content })
    }

    return(
        <>
            {error && JSON.stringify(error)}
            <form onSubmit={handleSubmit}>
                <textarea onChange={(e) => setContent(e.target.value)}></textarea>

                <div>
                    <button type="submit">Tweet</button>
                </div>
            </form>
        </>
    )
}