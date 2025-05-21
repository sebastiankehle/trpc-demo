# Understanding tRPC: The Ultimate Guide

## What is tRPC?

tRPC (TypeScript Remote Procedure Call) revolutionizes API development by enabling truly type-safe client-server communication without schemas or code generation. Unlike traditional REST or GraphQL APIs, tRPC leverages TypeScript's type system to provide end-to-end type safety between your client and server.

### Why tRPC Over Alternatives?

#### vs REST:

- No need for OpenAPI/Swagger schemas
- No type generation steps
- Full type inference out of the box
- Better error handling through TypeScript

#### vs GraphQL:

- No schema definition
- Smaller bundle size
- Less boilerplate
- Native TypeScript support without codegen
- Simpler caching strategy

#### vs gRPC:

- No protobuf files
- Easier setup
- Better browser support
- More flexible transport layer

## Core Concepts

### 1. Procedures

- **Queries**: Read operations
- **Mutations**: Write operations
- **Subscriptions**: Real-time updates

### 2. Routers

- Logical grouping of procedures
- Nested routing support
- Middleware attachment points
- Context sharing

### 3. Context

- Request-specific data
- Authentication state
- Database connections
- Custom utilities

## Setting Up tRPC

### Server-Side Setup

1. **Installation**

   ```bash
   pnpm add @trpc/server zod
   ```

2. **Create Context**

   ```typescript
   export interface Context {
     user?: {
       id: string;
       role: string;
     };
     prisma: PrismaClient;
   }

   export const createContext = async (opts: CreateNextContextOptions) => {
     const session = await getSession(opts);
     return {
       user: session?.user,
       prisma: new PrismaClient(),
     };
   };
   ```

3. **Define Router**

   ```typescript
   export const appRouter = router({
     users: userRouter,
     posts: postRouter,
     comments: commentRouter,
   });

   export type AppRouter = typeof appRouter;
   ```

### Client-Side Setup

1. **Installation**

   ```bash
   pnpm add @trpc/client @trpc/react-query @tanstack/react-query
   ```

2. **Create Client**

   ```typescript
   import { createTRPCReact } from "@trpc/react-query";
   import type { AppRouter } from "../server/router";

   export const trpc = createTRPCReact<AppRouter>();
   ```

3. **Provider Setup**

   ```typescript
   function App() {
     const [queryClient] = useState(() => new QueryClient());
     const [trpcClient] = useState(() =>
       trpc.createClient({
         url: "http://localhost:3000/api/trpc",
       })
     );

     return (
       <trpc.Provider client={trpcClient} queryClient={queryClient}>
         <QueryClientProvider client={queryClient}>
           {/* Your app */}
         </QueryClientProvider>
       </trpc.Provider>
     );
   }
   ```

## Real-World Usage Patterns

### 1. Input Validation with Zod

```typescript
const userRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        role: z.enum(["USER", "ADMIN"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.user.create({
        data: input,
      });
    }),
});
```

### 2. Error Handling

```typescript
const postRouter = router({
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.post.delete({
          where: { id: input },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
          cause: error,
        });
      }
    }),
});
```

### 3. Subscriptions (Real-time)

```typescript
const chatRouter = router({
  onMessage: publicProcedure
    .input(z.string())
    .subscription(({ input, ctx }) => {
      return observable((emit) => {
        const onMessage = (message: Message) => {
          emit.next(message);
        };

        ctx.chatRoom.join(input);
        ctx.chatRoom.onMessage(onMessage);

        return () => {
          ctx.chatRoom.leave(input);
          ctx.chatRoom.offMessage(onMessage);
        };
      });
    }),
});
```

## Advanced Patterns

### 1. Middleware Implementation

```typescript
const isAdmin = middleware(async ({ ctx, next }) => {
  if (!ctx.user?.role === "ADMIN") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

const adminProcedure = publicProcedure.use(isAdmin);
```

### 2. Batching Queries

```typescript
const usersRouter = router({
  getMany: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.user.findMany({
        where: {
          id: { in: input },
        },
      });
    }),
});
```

### 3. Optimistic Updates

```typescript
const mutation = trpc.posts.create.useMutation({
  onMutate: async (newPost) => {
    await utils.posts.list.cancel();
    const prevData = utils.posts.list.getData();

    utils.posts.list.setData(undefined, (old) => ({
      ...old,
      posts: [...old.posts, newPost],
    }));

    return { prevData };
  },
  onError: (err, newPost, context) => {
    utils.posts.list.setData(undefined, context.prevData);
  },
});
```

## Monorepo Best Practices

### 1. Package Structure

```
packages/
  ├── api/
  │   ├── src/
  │   │   ├── router/
  │   │   ├── context.ts
  │   │   └── index.ts
  │   └── package.json
  ├── client/
  │   ├── src/
  │   │   ├── hooks/
  │   │   └── trpc.ts
  │   └── package.json
  └── shared/
      ├── src/
      │   └── types/
      └── package.json
```

### 2. Type Sharing

```typescript
// packages/shared/types/index.ts
export interface User {
  id: string;
  name: string;
  role: "USER" | "ADMIN";
}

// packages/api/router/users.ts
import type { User } from "@your-org/shared";

// packages/client/hooks/useUser.ts
import type { User } from "@your-org/shared";
```

## Performance Optimization

### 1. Query Optimization

```typescript
const postsRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const items = await ctx.prisma.post.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (items.length > input.limit) {
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
});
```

### 2. Caching Strategy

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

## Security Best Practices

### 1. Rate Limiting

```typescript
const rateLimit = middleware(async ({ ctx, next }) => {
  const ip = ctx.req.ip;
  const limit = await redis.incr(`rate-limit:${ip}`);

  if (limit > 100) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Rate limit exceeded",
    });
  }

  return next({ ctx });
});
```

### 2. Input Sanitization

```typescript
const sanitizeInput = middleware(async ({ ctx, next, rawInput }) => {
  if (typeof rawInput === "string") {
    return next({
      ctx,
      rawInput: DOMPurify.sanitize(rawInput),
    });
  }
  return next({ ctx, rawInput });
});
```

## Testing Strategies

### 1. Integration Tests

```typescript
describe("userRouter", () => {
  const ctx = createMockContext();
  const caller = appRouter.createCaller(ctx);

  it("creates a user", async () => {
    const user = await caller.users.create({
      name: "Test User",
      email: "test@example.com",
    });

    expect(user).toMatchObject({
      name: "Test User",
      email: "test@example.com",
    });
  });
});
```

### 2. Mocking

```typescript
const mockTrpc = createTRPCMsw({
  baseUrl: "http://localhost:3000/api/trpc",
  router: appRouter,
});

mockTrpc.users.get.query((req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.data({
      id: "1",
      name: "Mock User",
    })
  );
});
```

## Deployment Considerations

### 1. Edge Runtime

```typescript
export const config = {
  runtime: "edge",
  regions: ["fra1", "sfo1"],
};

export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});
```

### 2. API Routes

```typescript
// pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/router";
import { createContext } from "../../../server/context";

export default createNextApiHandler({
  router: appRouter,
  createContext,
  batching: {
    enabled: true,
  },
});
```

## Resources

### Official Resources

- [tRPC Documentation](https://trpc.io)
- [tRPC GitHub](https://github.com/trpc/trpc)
- [Example Applications](https://github.com/trpc/examples-next-prisma-starter)

### Community Resources

- [tRPC Discord](https://trpc.io/discord)
- [Community Packages](https://github.com/trpc/awesome-trpc)
- [Blog Posts and Tutorials](https://trpc.io/blog)

### Tools and Extensions

- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=sachinraja.trpc-vscode)
- [Prisma Generator](https://github.com/omar-dulaimi/prisma-trpc-generator)
- [OpenAPI Generator](https://github.com/jlalmes/trpc-openapi)

## Troubleshooting

### Common Issues

1. **Type Inference Not Working**

   - Check TypeScript version
   - Verify import paths
   - Clear TypeScript cache

2. **Performance Issues**

   - Enable query batching
   - Implement proper caching
   - Use cursor-based pagination

3. **Authentication Problems**
   - Verify context creation
   - Check middleware chain
   - Validate token handling

### Debug Tools

1. **Server-side Logging**

```typescript
const loggerMiddleware = middleware(async ({ path, next }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;
  console.log(`${path}: ${durationMs}ms`);
  return result;
});
```

2. **Client-side Debugging**

```typescript
const trpcClient = trpc.createClient({
  url: "http://localhost:3000/api/trpc",
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});
```
