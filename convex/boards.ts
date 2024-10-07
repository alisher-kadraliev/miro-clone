import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { getAllOrThrow } from "convex-helpers/server/relationships"

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favorite: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new ConvexError("Unauthorized")
        }

        if (args.favorite) {
            const favoriteBoards = await ctx.db.query("UserFavorites").withIndex("by_user_org", (q) => q
                .eq("userId", identity.subject)
                .eq("orgId", args.orgId)
            )
                .order("desc")
                .collect()

            const ids = favoriteBoards.map((board) => board.boardId)

            const boards = await getAllOrThrow(ctx.db, ids)

            return boards.map((board) => ({
                ...board,
                isFavorite:true
            }))
        }
        const title = args.search as string

        let boards = []

        if (title) {
            boards = await ctx.db
                .query("boards")
                .withSearchIndex("search_title", (q) => q
                    .search("title", title)
                    .eq("orgId", args.orgId)
                ).collect()
        } else {
            boards = await ctx.db
                .query("boards")
                .withIndex("by_orgId", (q) => q
                    .eq("orgId", args.orgId)).
                order("desc")
                .collect()
        }

        const boardWithFavRelation = boards.map((board) => {
            return ctx.db.query("UserFavorites").withIndex("by_user_board",
                (q) => q
                    .eq("userId", identity.subject)
                    .eq("boardId", board._id)
            )
                .unique()
                .then((fav) => {
                    return {
                        ...board,
                        isFavorite: !!fav
                    }
                })
        })
        const boardsWithFavRelation = Promise.all(boardWithFavRelation)
        return boardsWithFavRelation
    }
})