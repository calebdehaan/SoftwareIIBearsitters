package petfinder.site.elasticsearch;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository.ElasticSearchJsonRepository;
import org.springframework.stereotype.Service;
import petfinder.site.common.notification.NotificationDto;

@Service
public class NotificationElasticSearchRepository extends ElasticSearchJsonRepository<NotificationDto, String> {

  public NotificationElasticSearchRepository(ElasticSearchClientProvider client) {
    super(new ElasticSearchIndex(client, "petfinder-notifications"), NotificationDto.class);
  }
}
