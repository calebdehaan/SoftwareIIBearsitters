package petfinder.site.endpoint;

import java.net.URLDecoder;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import petfinder.site.common.notification.NotificationDto;
import petfinder.site.common.notification.NotificationService;

@RestController
@RequestMapping("/api/notification")
public class NotificationEndpoint {
  @Autowired
  private NotificationService notificationService;

  @GetMapping(value = "/{userName}", produces = "application/json")
  public List<Optional<NotificationDto>> getUserNotification(@PathVariable("userName") String userName) {
    return notificationService.getUserNotification(URLDecoder.decode(userName));
  }

  @PostMapping(produces = "application/json")
  public void saveNotification(@RequestBody NotificationDto notification) {
    notificationService.save(notification);
  }
}
