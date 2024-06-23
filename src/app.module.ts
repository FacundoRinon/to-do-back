import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ListsModule } from './modules/lists/lists.module';

@Module({
  imports: [UsersModule, ListsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
