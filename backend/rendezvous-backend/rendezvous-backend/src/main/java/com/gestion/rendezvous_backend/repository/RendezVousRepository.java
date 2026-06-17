package com.gestion.rendezvous_backend.repository;

import com.gestion.rendezvous_backend.model.RendezVous;
import com.gestion.rendezvous_backend.model.StatutRendezVous;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {

    List<RendezVous> findByNomClientContainingIgnoreCase(String nomClient);

    List<RendezVous> findByStatut(StatutRendezVous statut);

    Page<RendezVous> findByNomClientContainingIgnoreCase(String nomClient, Pageable pageable);

    Page<RendezVous> findByStatut(StatutRendezVous statut, Pageable pageable);

    Page<RendezVous> findByNomClientContainingIgnoreCaseAndStatut(String nomClient, StatutRendezVous statut, Pageable pageable);
}
