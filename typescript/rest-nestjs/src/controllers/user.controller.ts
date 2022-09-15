import {
  Controller,
  Get,
  Param,
  Post,
  Body,
} from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { User as UserModel, Post as PostModel, Prisma } from '@prisma/client'

@Controller()
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany()
  }

  @Get('user/:id/drafts')
  async getDraftsByUser(@Param('id') id: string): Promise<PostModel[]> {
    return this.prismaService.user
      .findUnique({
        where: { id: Number(id) },
      })
      .posts({
        where: {
          published: false,
        },
      })
  }

  @Post('signup')
  async signupUser(
    @Body()
    userData: {
      name?: string
      email: string
      posts?: Prisma.PostCreateInput[]
    },
  ): Promise<UserModel> {
    const postData = userData.posts?.map((post) => {
      return { title: post?.title, content: post?.content }
    })
    return this.prismaService.user.create({
      data: {
        name: userData?.name,
        email: userData.email,
        posts: {
          create: postData,
        },
      },
    })
  }

}
