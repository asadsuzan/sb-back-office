/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, any>;

  constructor(queryModel: Query<T[], T>, query: Record<string, any>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  // add search to query
  addSearch(searchableFields: string[]): this {
    if (this?.query?.searchTerm) {
      const searchTerm = this.query.searchTerm;
      const regex = new RegExp(searchTerm, 'i');
      this.queryModel = this.queryModel.where({
        $or: searchableFields.map((field) => ({ [field]: regex })),
      });
    }
    return this;
  }

  // add filter to query
  addFilter(): this {
    const filter: Record<string, unknown> = { ...this.query };
    // exclude fields
    const excludeQuery: string[] = [
      'searchTerm',
      'page',
      'limit',
      'sort',
      'fields',
    ];
    excludeQuery.forEach((field) => delete filter[field]);
    this.queryModel = this.queryModel.find(filter as FilterQuery<T>);
    return this;
  }
  // add pagination to query
  addPagination(): this {
    const page = parseInt(this.query.page as string, 10) || 1;
    const limit = parseInt(this.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit || 0;
    this.queryModel = this.queryModel.skip(skip).limit(limit);
    return this;
  }

  // add sorting to query
  addSorting(): this {
    const sort = this?.query?.sort?.split(',').join(' ') || '-createdAt';
    this.queryModel = this.queryModel.sort(sort);
    return this;
  }
  // add fields to query
  addFields(): this {
    const fields = this?.query?.fields?.split(',').join(' ');
    this.queryModel = this.queryModel.select(fields);
    return this;
  }
}

export default QueryBuilder;
