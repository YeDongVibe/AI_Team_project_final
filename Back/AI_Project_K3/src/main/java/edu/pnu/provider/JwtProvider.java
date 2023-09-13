package edu.pnu.provider;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {
	
	private final SecretKey secretKey;
	
	public JwtProvider() {
		this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	}

	public String create(String username, String authority) {

		Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

		String jwt = Jwts.builder().signWith(secretKey).claim("username", username)
				.claim("authority", authority)
				.setIssuedAt(new Date()).setExpiration(expiredDate).compact();

		return jwt;
	}

	public Claims validate(String jwt) {

		Claims claims = null;

		try {

			claims = Jwts.parser()
					.setSigningKey(secretKey)
					.parseClaimsJws(jwt).getBody();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return claims;
	}
}
