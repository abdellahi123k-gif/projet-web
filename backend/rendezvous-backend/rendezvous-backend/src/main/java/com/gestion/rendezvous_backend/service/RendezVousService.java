package com.gestion.rendezvous_backend.service;

import com.gestion.rendezvous_backend.dto.RendezVousRequest;
import com.gestion.rendezvous_backend.dto.RendezVousResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RendezVousService {

    Page<RendezVousResponse> getAllRendezVous(String nomClient, String statut, Pageable pageable);

    RendezVousResponse getRendezVousById(Long id);

    RendezVousResponse createRendezVous(RendezVousRequest request);

    RendezVousResponse updateRendezVous(Long id, RendezVousRequest request);

    void deleteRendezVous(Long id);
}
