import { Module, HttpModule } from '@nestjs/common';
import { JokesService } from './jokes.service';

@Module({
  imports: [HttpModule],
  providers: [JokesService],
})
export class JokesModule {}
