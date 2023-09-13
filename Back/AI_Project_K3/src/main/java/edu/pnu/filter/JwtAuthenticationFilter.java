package edu.pnu.filter;

import java.io.IOException;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import edu.pnu.provider.JwtProvider;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtProvider jwtProvider;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		try {
			String token = parseBearerToken(request);

			if (token == null) {
				filterChain.doFilter(request, response);
				return;
			}
			
			Claims claims = jwtProvider.validate(token);
			String username = claims.getSubject();
			String authority = (String) claims.get("authority");
			if (username == null) {
				filterChain.doFilter(request, response);
				return;
			}

			AbstractAuthenticationToken abstractToken = new UsernamePasswordAuthenticationToken(username, authority,
					AuthorityUtils.NO_AUTHORITIES);
			abstractToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

			SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
			securityContext.setAuthentication(abstractToken);

			SecurityContextHolder.setContext(securityContext);

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		filterChain.doFilter(request, response);
	}

	private String parseBearerToken(HttpServletRequest req) {

		String authorization = req.getHeader("Authorization");

		boolean hasAuthorization = StringUtils.hasText(authorization);
		if (!hasAuthorization)
			return null;

		boolean isBearer = authorization.startsWith("Bearer ");
		if (!isBearer)
			return null;

		String token = authorization.substring(7);
		return token;

	}

}
