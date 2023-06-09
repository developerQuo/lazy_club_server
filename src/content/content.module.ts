import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentEntity } from './entities/content.entity';
import { ContentFileEntity } from './entities/content_file.entity';
import { ContentService } from './content.service';
import { FavoriteEntity } from './entities/Favorite.entity';
import { LikeEntity } from './entities/Like.entity';
import { ContentResolver } from './content.resolver';
import { ChannelEntity } from 'src/channel/entities/channel.entity';
import { UploadModule } from 'src/upload/upload.module';
import { CommonModule } from '@root/common/common.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ContentEntity,
			ContentFileEntity,
			FavoriteEntity,
			LikeEntity,
			ChannelEntity,
		]),
		UploadModule,
		CommonModule,
	],
	providers: [ContentService, ContentResolver],
})
export class ContentModule {}
