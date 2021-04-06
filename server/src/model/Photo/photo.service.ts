import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private PhotoRepository: Repository<Photo>,
  ) {}

  async findAll(): Promise<Photo[]> {
    return this.PhotoRepository.find();
  }
}
