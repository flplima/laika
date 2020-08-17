import { Module, HttpModule } from '@nestjs/common';
import { BoredService } from './bored.service';

@Module({
  imports: [HttpModule],
  providers: [BoredService],
})
export class BoredModule {}
