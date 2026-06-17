package com.gestion.rendezvous_backend.dto;

import com.gestion.rendezvous_backend.model.StatutRendezVous;

import java.time.LocalDate;
import java.time.LocalTime;

public record RendezVousResponse(
        Long id,
        String nomClient,
        String telephone,
        LocalDate dateRendezVous,
        LocalTime heureRendezVous,
        StatutRendezVous statut
) {
}
