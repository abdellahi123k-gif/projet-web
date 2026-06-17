package com.gestion.rendezvous_backend.mapper;

import com.gestion.rendezvous_backend.dto.RendezVousRequest;
import com.gestion.rendezvous_backend.dto.RendezVousResponse;
import com.gestion.rendezvous_backend.model.RendezVous;
import org.springframework.stereotype.Component;

@Component
public class RendezVousMapper {

    public RendezVousResponse toResponse(RendezVous entity) {
        return new RendezVousResponse(
                entity.getId(),
                entity.getNomClient(),
                entity.getTelephone(),
                entity.getDateRendezVous(),
                entity.getHeureRendezVous(),
                entity.getStatut()
        );
    }

    public RendezVous toEntity(RendezVousRequest request) {
        return RendezVous.builder()
                .nomClient(request.nomClient())
                .telephone(request.telephone())
                .dateRendezVous(request.dateRendezVous())
                .heureRendezVous(request.heureRendezVous())
                .statut(request.statut())
                .build();
    }

    public void updateEntity(RendezVous entity, RendezVousRequest request) {
        entity.setNomClient(request.nomClient());
        entity.setTelephone(request.telephone());
        entity.setDateRendezVous(request.dateRendezVous());
        entity.setHeureRendezVous(request.heureRendezVous());
        entity.setStatut(request.statut());
    }
}
