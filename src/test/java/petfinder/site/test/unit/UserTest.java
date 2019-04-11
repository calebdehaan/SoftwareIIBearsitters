package petfinder.site.test.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import petfinder.site.common.user.UserDto;

public class UserTest {
  @DisplayName("UserDto")
  @Nested
  class UserDtoTest {
    @DisplayName("Constructor")
    @Nested
    class Constructor {
      @DisplayName("Argument Constructor")
      @Test
      void argument() {
        //create values to use as arguments
        String principal = "principal";
        List<String> roles = Arrays.asList("role1", "role2");
        Map<String, Object> attributes = new HashMap<>();
        Map<String, Object> address = new HashMap<>();
        List<String> pets = Arrays.asList("123","122");
        List<String> posts = Arrays.asList("123222","122111");
        List<String> ratings = Arrays.asList("1222","1211");

        //call constructor
        UserDto dto = new UserDto(principal, roles, attributes, address, pets, posts, ratings);

        //verify values
        assertEquals(principal, dto.getPrincipal());
        assertEquals(roles, dto.getRoles());
        assertEquals(attributes, dto.getAttributes());
        assertEquals(address, dto.getAddress());
        assertEquals(pets, dto.getPets());
      }
    }

    @DisplayName("Add Pet")
    @Nested
    class AddPet {
      @DisplayName("Pre-existing pet list")
      @Test
      void listExists() {
        String petId = "123";
        List<String> pets = new ArrayList<>();
        UserDto dto = new UserDto(null, null, null, null, pets, null, null);
        dto.addPet(petId);
        assertTrue(dto.getPets().contains(petId));
      }

      @DisplayName("Pet list is null")
      @Test
      void noList() {
        String petId = "122";
        UserDto dto = new UserDto(null, null, null, null, null, null, null);
        dto.addPet(petId);
        assertTrue(dto.getPets().contains(petId));
      }

      @DisplayName("Pet id is null")
      @Test
      void nullPet() {
        UserDto dto = new UserDto(null, null, null, null, null, null, null);
        dto.addPet(null);
        //TODO what should happen if you try to add null? Outside of the scope of this project
      }
    }

    @DisplayName("Delete Pet")
    @Nested
    class DeletePet {
      @DisplayName("Pet exists in list")
      @Test
      void petExists() {
        String petId = "123";
        List<String> pets = new ArrayList<>();
        pets.add(petId);
        UserDto dto = new UserDto(null, null, null, null, pets, null, null);
        dto.deletePet(petId);
      }

      @DisplayName("Pet not in list")
      @Test
      void badPet() {
        List<String> pets = new ArrayList<>();
        pets.add("123");
        pets.add("122");
        UserDto dto = new UserDto(null, null, null, null, pets, null, null);
        dto.deletePet("12");
        //TODO what should happen if you try to delete a pet that doesn't exist?
      }

      @DisplayName("List is null")
      @Test
      void noList() {
        String petId = "1222";
        UserDto dto = new UserDto(null, null, null, null, null, null, null);
        dto.deletePet(petId);
      }

      @DisplayName("Pet id is null")
      @Test
      void nullPet() {
        List<String> pets = new ArrayList<>();
        pets.add("1");
        UserDto dto = new UserDto(null, null, null, null, pets, null, null);
        dto.deletePet(null);
        //TODO what should happen if you try to delete null?
      }
    }
  }
}
