import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './schemas/store.schema';


@Controller()
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('addStore')
  create(@Body() createStoreDto: CreateStoreDto): Promise<{ stores: object }> {
    return this.storeService.create(createStoreDto);
  }



  @Get('getAllStoreDetails')
  async getStore(): Promise<Store[]> {
    return this.storeService.findStore();
  }
 
  @Get(':id')
  async getStoreDetail(
    @Param('id')
    id: string,
  ): Promise<Store> {
    return this.storeService.findOne(id);;
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
