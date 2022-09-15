import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UserController } from './controllers/user.controller'
import { PrismaService } from './prisma.service'

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [PrismaService],
})
export class AppModule {}
