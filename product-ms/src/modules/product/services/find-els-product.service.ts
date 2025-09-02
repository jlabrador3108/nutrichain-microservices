import { IndexEls } from "../../../common/enums/els-index.enum";
import elasticClient from "../../../common/services/elasticsearch-service";
import {
  FindElsProductQuery,
  FindElsProductSchema,
} from "../dtos/find-els-product.dto";
import Product from "../models/product.persistence.entity";
import { Response } from "../../../common/interfaces/response-interfaces";

export class FindElsProductService {
  async findEls(rawQuery: FindElsProductQuery): Promise<Response<any>> {
    const query = FindElsProductSchema.parse(rawQuery);

    const must: any[] = [];
    const must_not: any[] = [{ exists: { field: "deletedAt" } }];

    if (query.name) {
      must.push({
        bool: {
          should: [
            {
              fuzzy: {
                name: { value: query.name, fuzziness: "AUTO:1,4", boost: 2 },
              },
            },
            {
              fuzzy: {
                tags: { value: query.name, fuzziness: "AUTO:1,4", boost: 2 },
              },
            },
            {
              match_phrase_prefix: { name: { query: query.name, boost: 15 } },
            },
            {
              query_string: {
                query: `*${query.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}*`,
                fields: ["name"],
                boost: 10,
              },
            },
          ],
        },
      });
    }

    if (query.categoryFoodId) {
      must.push({
        term: { categoryFoodId: query.categoryFoodId },
      });
    }

    const esQuery = {
      bool: {
        must,
        must_not,
      },
    };

    const response = await elasticClient.search({
      index: IndexEls.PRODUCT,
      query: esQuery,
      track_total_hits: true,
    });

    const total =
      typeof response.hits.total === "number"
        ? response.hits.total
        : response.hits.total?.value ?? 0;

    const data: Product[] = response.hits.hits
      .map((hit) => hit._source)
      .filter((src): src is Product => !!src);

    return { data, meta: { total } };
  }
}
