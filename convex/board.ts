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

export const remove = mutation({
    args: {
        id: v.id("boards"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error('Unauthorized')
        }
        const userId = identity.subject
        const existingFavorites = await ctx.db.query("UserFavorites").withIndex("by_user_board", (q) => q
            .eq("userId", userId)
            .eq("boardId", args.id)
        ).unique()
        if (existingFavorites) {
            await ctx.db.delete(existingFavorites._id)
        }
        await ctx.db.delete(args.id)
    }
})

export const update = mutation({
    args: {
        id: v.id("boards"),
        title: v.string()
    },
    handler: async (ctx, args) => {
        const title = args.title.trim()
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error('Unauthorized')
        }
        if (!title) {
            throw new Error("Title is required")
        }
        if (title.length > 60) {
            throw new Error("Title must be less than 30 characters")
        }
        const board = await ctx.db.patch(args.id, {
            title: args.title
        })
        return board
    }
})

export const favorite = mutation({
    args: {
        id: v.id("boards"),
        orgId: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthorized")
        }
        const board = await ctx.db.get(args.id)

        if (!board) {
            throw new Error("Board not found")
        }
        const userId = identity.subject

        const existingFavorite = await
            ctx.db
                .query("UserFavorites")
                .withIndex("by_user_board", (q) =>
                    q
                        .eq("userId", userId)
                        .eq("boardId", board._id)
                )
                .unique()

        if (existingFavorite) {
            throw new Error("Board already favorited")
        }
        await ctx.db.insert("UserFavorites", {
            userId,
            boardId: board._id,
            orgId: args.orgId
        })
        return board
    }
})
export const unfavorite = mutation({
    args: {
        id: v.id("boards"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthorized")
        }
        const board = await ctx.db.get(args.id)

        if (!board) {
            throw new Error("Board not found")
        }
        const userId = identity.subject

        const existingFavorite = await
            ctx.db
                .query("UserFavorites")
                .withIndex("by_user_board", (q) =>
                    q
                        .eq("userId", userId)
                        .eq("boardId", board._id)
                )
                .unique()

        if (!existingFavorite) {
            throw new Error("Board not favorited")
        }
        await ctx.db.delete(existingFavorite._id)
        return board
    }
})