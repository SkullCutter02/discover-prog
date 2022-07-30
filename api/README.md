## Commands

Start dev server: `yarn start:dev`

Seed database: `yarn seed:dev`

Run migration: `prisma migrate dev --name <name>`

## Required ENV variables

`JWT_ACCESS_TOKEN_SECRET`: Secret of access token, can be anything

`JWT_ACCESS_TOKEN_EXPIRATION_TIME`: Expiration time of access token in seconds (e.g 900 = 15 min)


`JWT_REFRESH_TOKEN_SECRET`: Secret of refresh token, can be anything

`JWT_REFRESH_TOKEN_EXPIRATION_TIME`: Expiration time of refresh token in seconds (e.g 1209600 = 14 days)

`SENDGRID_API_KEY`: API key from sendgrid, login to sendgrid and retrieve the key

`FRONTEND_URL`: What the frontend URL will be

`RESET_PASSWORD_REDIRECT_URL`: Where the reset password URL from the frontend be

`REDIS_HOST`: Redis host (like localhost)

`REDIS_PORT`: Port (most likely 6379)

`DATABASE_URL`: In the format of a pg connection string

## Cursor pagination example

```
async getPosts(cursorPaginateDto?: CursorPaginateDto) {
  if (Object.keys(cursorPaginateDto).length === 0) {
    return this.prisma.post.findMany({ include: { user: true } });
  } else {
    const { limit, cursor, filter } = cursorPaginateDto;
    const findManyInput: Prisma.PostFindManyArgs = {
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        title: {
          contains: filter,
          mode: "insensitive",
        },
      },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      include: { user: true },
    };
    const [posts, nextPage] = await this.prisma.$transaction([
      this.prisma.post.findMany({ ...findManyInput, skip: cursor ? 1 : undefined }), // if cursor exists, skip 1
      this.prisma.post.findMany({ ...findManyInput, skip: cursor ? limit + 1 : limit }),
    ]);
    return { data: posts, hasMore: nextPage.length !== 0 };
  }
}
```

```
export class CursorPaginateDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @IsUUID()
  @IsOptional()
  cursor?: string;

  @IsString()
  @IsOptional()
  filter?: string;
}
```

From the last batch of items received, get the ID of the last item, and pass it in as the cursor.

## CASL authorization

Currently it uses a very weird guard called CheckOwnershipGuard to do this, but it isn't very elegant. 
Recommend switching to nest-casl: https://github.com/getjerry/nest-casl

Docs are quite straightforward I believe. Make sure you define a Role enum in the prisma schema and that the user has a roles array

Example I made: https://github.com/SkullCutter02/nest-casl-example

Make sure to use the prisma-class-generator generator to generate Prisma classes that can be used for CASL

If this is used, delete the CheckOwnershipGuard as well as the CheckOwnershipDecorator from the guards and decorator folder respectively