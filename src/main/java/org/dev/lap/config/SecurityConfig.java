package org.dev.lap.config;
import jakarta.servlet.http.HttpServletResponse;
//import org.dev.lap.services.BorrowerDetailServices;
import org.dev.lap.services.BorrowerDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Autowired
    private BorrowerDetailsService borrowerDetailServices;
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(borrowerDetailServices);
        authProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(authProvider);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/admin/register",
                                "/api/register/user",
                                "/api/admin/login",
                                "/api/admin/librarian_registration",
                                "/api/librarian/librarian_login",
                                "/api/login/user",
                                "/api/librarian/users",
                                "/api/register/book",
                                "/api/user/borrow/{bookId}",
                                "/api/user/getAllBooks",
                                "/api/librarian/transactions")
                        .permitAll()

                        .requestMatchers("/api/admin/librarian_registration").hasAuthority("ROLE_LIBRARIAN")
                        .requestMatchers("/api/admin/register").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/api/register/user").hasAuthority("ROLE_USER")
                        .requestMatchers("/api/login/user").hasAuthority("ROLE_USER")
                        .requestMatchers("/api/librarian/users").hasRole("LIBRARIAN")
                        .requestMatchers("/api/librarian/librarian_login").hasAuthority("ROLE_LIBRARIAN")
                        .requestMatchers("/api/register/book").hasRole("LIBRARIAN")
//                        .requestMatchers("/api/user/borrow/{bookId}").hasAuthority("ROLE_USER")
                        .requestMatchers("/api/user/borrow/{bookId}").hasRole("USER")
                                .requestMatchers("/api/librarian/transactions").hasRole("LIBRARIAN")
                                .requestMatchers("/api/user/getAllBooks").hasRole("USER")

                                .anyRequest().authenticated()
                )

                .httpBasic(Customizer.withDefaults())
//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(ex ->
                        ex.authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"error\": \"Unauthorized - " + authException.getMessage() + "\"}");
                        })
                );
        return http.build();
    }

}
