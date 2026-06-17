package com.gestion.rendezvous_backend.service.impl;

import com.gestion.rendezvous_backend.dto.RendezVousRequest;
import com.gestion.rendezvous_backend.dto.RendezVousResponse;
import com.gestion.rendezvous_backend.exception.ResourceNotFoundException;
import com.gestion.rendezvous_backend.mapper.RendezVousMapper;
import com.gestion.rendezvous_backend.model.RendezVous;
import com.gestion.rendezvous_backend.model.StatutRendezVous;
import com.gestion.rendezvous_backend.repository.RendezVousRepository;
import com.gestion.rendezvous_backend.service.RendezVousService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class RendezVousServiceImpl implements RendezVousService {

    private final RendezVousRepository repository;
    private final RendezVousMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public Page<RendezVousResponse> getAllRendezVous(String nomClient, String statut, Pageable pageable) {
        Page<RendezVous> page;

        boolean hasNom = nomClient != null && !nomClient.isBlank();
        boolean hasStatut = statut != null && !statut.isBlank();

        if (hasNom && hasStatut) {
            page = repository.findByNomClientContainingIgnoreCaseAndStatut(
                    nomClient, StatutRendezVous.valueOf(statut), pageable);
        } else if (hasNom) {
            page = repository.findByNomClientContainingIgnoreCase(nomClient, pageable);
        } else if (hasStatut) {
            page = repository.findByStatut(StatutRendezVous.valueOf(statut), pageable);
        } else {
            page = repository.findAll(pageable);
        }

        return page.map(mapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public RendezVousResponse getRendezVousById(Long id) {
        RendezVous entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rendez-vous", id));
        return mapper.toResponse(entity);
    }

    @Override
    public RendezVousResponse createRendezVous(RendezVousRequest request) {
        RendezVous entity = mapper.toEntity(request);
        entity = repository.save(entity);
        return mapper.toResponse(entity);
    }

    @Override
    public RendezVousResponse updateRendezVous(Long id, RendezVousRequest request) {
        RendezVous entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rendez-vous", id));
        mapper.updateEntity(entity, request);
        entity = repository.save(entity);
        return mapper.toResponse(entity);
    }

    @Override
    public void deleteRendezVous(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Rendez-vous", id);
        }
        repository.deleteById(id);
    }
}
