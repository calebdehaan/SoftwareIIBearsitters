package petfinder.site.common.notification;

import alloy.util.Momento;

public class NotificationDto implements Momento<String> {
  private String id;
  private String recipientUserName;
  private String senderUserName;
  private String message;
  private String sentTime;

  private NotificationDto() {

  }

  public NotificationDto(String id, String recipientUserName, String senderUserName, String message, String sentTime) {
    setId(id);
    setRecipientUserName(recipientUserName);
    setSenderUserName(senderUserName);
    setMessage(message);
    setSentTime(sentTime);
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getRecipientUserName() {
    return recipientUserName;
  }

  public void setRecipientUserName(String recipientUserName) {
    this.recipientUserName = recipientUserName;
  }

  public String getSenderUserName() {
    return senderUserName;
  }

  public void setSenderUserName(String senderUserName) {
    this.senderUserName = senderUserName;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getSentTime() {
    return sentTime;
  }

  public void setSentTime(String sentTime) {
    this.sentTime = sentTime;
  }

  @Override
  public String getMomento() {
    return id;
  }

  public boolean isEmpty() {
    return id == null;
  }
}
