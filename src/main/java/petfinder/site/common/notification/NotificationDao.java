package petfinder.site.common.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import alloy.elasticsearch.ElasticSearchClientProvider;
import petfinder.site.elasticsearch.NotificationElasticSearchRepository;

@Repository
public class NotificationDao {

  @Autowired
  private NotificationElasticSearchRepository notificationElasticSearchRepository;


  public void save(NotificationDto notif) {
    notificationElasticSearchRepository.save(notif);
  }

}
