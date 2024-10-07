import { v } from 'convex/values'
import { mutation } from './_generated/server'
const images = [
    "/1.svg",
    "/2.svg",
    "/3.svg",
    "/4.svg",
]
export const create = mutation({
    args: {
        title: v.string(),
        orgId: v.string(),
        /*  authorId: v.string(),
         authorName: v.string(),
         imageUrl: v.string(), */
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error('Unauthorized')
        }

        const randomImage = images[Math.floor(Math.random() * images.length)]
        const board = await ctx.db.insert('boards', {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
        })
        return board
    }
})