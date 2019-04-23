package petfinder.site.common.notification;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.elasticsearch.NotificationElasticSearchRepository;

@Repository
public class NotificationDao {

  @Autowired
  private NotificationElasticSearchRepository notificationElasticSearchRepository;

  public List<Optional<NotificationDto>> getUserNotifications(String userName) {
    SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

    searchSourceBuilder.query(QueryBuilders.matchQuery("recipientUserName", userName));
    List<NotificationDto> notifications = notificationElasticSearchRepository.search(searchSourceBuilder);
    List<Optional<NotificationDto>> finalNotifications = new ArrayList<>();

    for(NotificationDto n : notifications) {
      finalNotifications.add(Optional.ofNullable(n).filter(sf -> !sf.isEmpty()));
    }

    return finalNotifications;
  }

  public void save(NotificationDto notificationDto) {
    notificationElasticSearchRepository.save(notificationDto);
  }
}
