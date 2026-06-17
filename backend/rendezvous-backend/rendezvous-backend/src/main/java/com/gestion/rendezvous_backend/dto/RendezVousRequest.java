package com.gestion.rendezvous_backend.dto;

import com.gestion.rendezvous_backend.model.StatutRendezVous;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;
import java.time.LocalTime;

public record RendezVousRequest(
        @NotBlank(message = "Le nom du client est obligatoire")
        String nomClient,

        @NotBlank(message = "Le téléphone est obligatoire")
        @Pattern(regexp = "^\\+\\d{7,15}$", message = "Format de téléphone invalide (ex: +212612345678)")
        String telephone,

        @NotNull(message = "La date est obligatoire")
        @FutureOrPresent(message = "La date doit être aujourd'hui ou dans le futur")
        LocalDate dateRendezVous,

        @NotNull(message = "L'heure est obligatoire")
        LocalTime heureRendezVous,

        @NotNull(message = "Le statut est obligatoire")
        StatutRendezVous statut
) {
}
