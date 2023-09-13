//회원 정보를 담는 Entity Class

package edu.pnu.domain;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_db")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    
    @Column(name = "username", unique = true ,nullable = false)
    private String username;
    
    @Column(name = "password")
    private String password;
    
    @Transient
    // DB에 저장하지 않아도 됨. Test 후 DB 열 수정 예정.
    private String user_pw_chk;
    private String name;
    private String email;
    private LocalDate birth;
    private String authority;
    
     public Collection<? extends GrantedAuthority> getAuthority() {
    	 if(authority==null) {
    		 return null;
    	 }
     return AuthorityUtils.createAuthorityList(authority);
     }
     
     @OneToMany(mappedBy = "username", cascade = CascadeType.REMOVE)
     @JsonIgnore
     private List<UserBoard> boardId;
     
     @OneToMany(mappedBy = "username", cascade = CascadeType.REMOVE)
     @JsonIgnore
     private List<UserComment> commentId;
     
     @OneToMany(mappedBy = "username", cascade = CascadeType.REMOVE)
     @JsonIgnore
     private List<UserLog> logId;
}
