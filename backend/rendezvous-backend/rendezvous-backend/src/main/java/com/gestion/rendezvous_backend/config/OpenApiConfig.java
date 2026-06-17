package com.gestion.rendezvous_backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API Gestion des Rendez-vous")
                        .description("API REST pour la gestion des rendez-vous")
                        .version("1.0")
                        .contact(new Contact()
                                .name("Équipe pédagogique")
                                .email("contact@example.com")));
    }
}
