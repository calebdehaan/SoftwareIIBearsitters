package petfinder.site.elasticsearch;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository.ElasticSearchJsonRepository;
import org.springframework.stereotype.Service;
import petfinder.site.common.rating.RatingDto;

@Service
public class RatingElasticSearchRepository extends ElasticSearchJsonRepository<RatingDto, String> {
  public RatingElasticSearchRepository(ElasticSearchClientProvider provider) {
    super(new ElasticSearchIndex(provider, "petfinder-ratings"), RatingDto.class);
  }
}
