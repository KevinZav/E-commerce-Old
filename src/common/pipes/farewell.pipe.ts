import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FarewellPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (value === 'goodbye') {
      return value;
    } else {
      throw new BadRequestException(`You say goodbye not say ${value}`);
    }
  }
}
