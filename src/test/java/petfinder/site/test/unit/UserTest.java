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
        List<Long> pets = Arrays.asList(1L,2L,3L,4L,5L);

        //call constructor
        UserDto dto = new UserDto(principal, roles, attributes, address, pets);

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
        long petId = 555L;
        List<Long> pets = new ArrayList<>();
        UserDto dto = new UserDto(null, null, null, null, pets);
        dto.addPet(petId);
        assertTrue(dto.getPets().contains(petId));
      }

      @DisplayName("Pet list is null")
      @Test
      void noList() {
        long petId = 32423L;
        UserDto dto = new UserDto(null, null, null, null, null);
        dto.addPet(petId);
        assertTrue(dto.getPets().contains(petId));
      }

      @DisplayName("Pet id is null")
      @Test
      void nullPet() {
        UserDto dto = new UserDto(null, null, null, null, null);
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
        long petId = 555L;
        List<Long> pets = new ArrayList<>();
        pets.add(petId);
        UserDto dto = new UserDto(null, null, null, null, pets);
        dto.deletePet(petId);
      }

      @DisplayName("Pet not in list")
      @Test
      void badPet() {
        List<Long> pets = new ArrayList<>();
        pets.add(555L);
        pets.add(3224L);
        UserDto dto = new UserDto(null, null, null, null, pets);
        dto.deletePet(333L);
        //TODO what should happen if you try to delete a pet that doesn't exist?
      }

      @DisplayName("List is null")
      @Test
      void noList() {
        long petId = 555L;
        UserDto dto = new UserDto(null, null, null, null, null);
        dto.deletePet(petId);
      }

      @DisplayName("Pet id is null")
      @Test
      void nullPet() {
        List<Long> pets = new ArrayList<>();
        pets.add(555L);
        UserDto dto = new UserDto(null, null, null, null, pets);
        dto.deletePet(null);
        //TODO what should happen if you try to delete null?
      }
    }
  }
}
