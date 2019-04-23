package petfinder.site.common.notification;

import alloy.util.Momento;

public class NotificationDto implements Momento<String> {
  String id;

  @Override
  public String getMomento() {
    return id;
  }
}
