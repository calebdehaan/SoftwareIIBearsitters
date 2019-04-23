package petfinder.site.test.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import petfinder.site.common.notification.NotificationDto;

public class NotificationTest {
  @DisplayName("NotificationDto")
  @Nested
  class NotificationDtoTest {
    private NotificationDto notification = new NotificationDto(null, null, null, null, null);

    @DisplayName("Setters")
    @Nested
    class Setters {
      @DisplayName("Set ID")
      @Test
      void setId() {
        String id = "test id";
        notification.setId(id);
        assertEquals(id, notification.getId());
      }

      @DisplayName("Set Recipient")
      @Test
      void setRecipient() {
        String person = "Joseph@Jose.com";
        notification.setRecipientUserName(person);
        assertEquals(person, notification.getRecipientUserName());
      }

      @DisplayName("Set Sender")
      @Test
      void setSender() {
        String person = "Jose@Joseph.com";
        notification.setSenderUserName(person);
        assertEquals(person, notification.getSenderUserName());
      }

      @DisplayName("Set Message")
      @Test
      void setMessage() {
        String message = "This is the message for the notification";
        notification.setMessage(message);
        assertEquals(message, notification.getMessage());
      }

      @DisplayName("Set Sent Time")
      @Test
      void setSentTime() {
        String sentTime = "09/12/2018 5:55PM";
        notification.setSentTime(sentTime);
        assertEquals(sentTime, notification.getSentTime());
      }
    }

    @DisplayName("Constructor")
    @Nested
    class Constructor {
      @DisplayName("Good Values")
      @Test
      void constr() {
        String id = "test id";
        String person0 = "Joseph@Jose.com";
        String person = "Jose@Joseph.com";
        String message = "This is the message for the notification";
        String sentTime = "09/12/2018 5:55PM";
        NotificationDto not = new NotificationDto(id, person0, person, message, sentTime);
        assertEquals(id, not.getId());
        assertEquals(person0, not.getRecipientUserName());
        assertEquals(person, not.getSenderUserName());
        assertEquals(message, not.getMessage());
        assertEquals(sentTime, not.getSentTime());
      }
    }
  }

}
