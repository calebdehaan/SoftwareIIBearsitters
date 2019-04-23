package petfinder.site.common.notification;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
  @Autowired
  private NotificationDao notificationDao;

  public List<Optional<NotificationDto>> getUserNotification(String userName) {
    return notificationDao.getUserNotifications(userName);
  }

  public void save(NotificationDto notification) {
    notificationDao.save(notification);
  }
}
