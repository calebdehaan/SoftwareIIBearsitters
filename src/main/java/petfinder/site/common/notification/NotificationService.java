package petfinder.site.common.notification;

import java.util.List;
import java.util.Optional;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petfinder.site.common.pet.PetDao;

@Service
public class NotificationService {
  @Autowired
  private NotificationDao notificationDao;

  public List<Optional<NotificationDto>> getUserNotification(String userName) {
    return null;
  }
}
