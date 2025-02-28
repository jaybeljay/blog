import { BadRequestException } from '@nestjs/common';
import { PaginationRequestDto } from 'src/common/dto/pagination.request.dto';
import { SelectQueryBuilder } from 'typeorm';

export async function paginateRaw<T>(
  qb: SelectQueryBuilder<T>,
  params: PaginationRequestDto,
) {
  let data = (await qb.getRawMany()) as T[];
  const total = data.length;

  const page = Number(params.page);
  const limit = Number(params.limit);

  if (page) {
    if (!limit) {
      throw new BadRequestException('limit must be not null or undefined');
    }

    const offset = (page - 1) * limit;
    data = data.slice(offset);
  }

  if (params.limit) {
    data = data.slice(0, params.limit);
  }

  const pageCount = limit ? Math.ceil(total / limit) : 1;

  return {
    data,
    limit,
    total,
    page: page || 1,
    pageCount,
  };
}

export const paginate = async <T>(
  qb: SelectQueryBuilder<T>,
  params: PaginationRequestDto,
) => {
  if (!qb.expressionMap.mainAlias.hasMetadata) {
    return paginateRaw(qb, params);
  }

  const total = await qb.getCount();

  const page = Number(params.page);
  const limit = Number(params.limit);

  if (page) {
    if (!limit) {
      throw new BadRequestException('limit must be not null or undefined');
    }

    const offset = (page - 1) * limit;
    qb.skip(offset);
  }

  if (limit) {
    qb.take(limit);
  }

  const data = await qb.getMany();

  const pageCount = limit ? Math.ceil(total / limit) : 1;

  return {
    data,
    limit,
    total,
    page: page || 1,
    pageCount,
  };
};
